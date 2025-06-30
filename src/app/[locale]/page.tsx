"use client";
import { Header } from "@/components/header/Header";
import { useEffect, useRef, useState } from "react";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Hero } from "@/components/hero/Hero";
import { News } from "@/components/news/News";
import { AboutNetwork } from "@/components/about-network/AboutNetwork";
import { Projects } from "@/components/projects/Projects";
import { MenuItemMobile } from "@/components/menu/MenuItemMobile";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/footer/Footer";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { Participate } from "@/components/participate/Participate";
import { useSearchParams } from "next/navigation";
import { GoogleSheetsResponse } from "@/app/api/responses";
import "./page.css";

export default function HomePage() {
  const t = useTranslations("MenuItems");
  const locale = useLocalePath();
  const searchParams = useSearchParams();

  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleMenuOpen } = useGlobalNavigationLayout();

  const lastReachedEndRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<GoogleSheetsResponse>();
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/fetch-content?lang=${locale}`, {
          cache: "force-cache",
          next: { revalidate: 1800 }, // 30 minutes
        });
        const { data }: { data: GoogleSheetsResponse } = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        alert("Error fetching data:" + JSON.stringify(error));
      }
    };
    getData();
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll("[data-sticky-index]");
      let newActiveIndex: number | null = null;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const index = parseInt(item.getAttribute("data-sticky-index")!);
        const stickyTop = isDownMd ? 70 + 48 * (index - 1) : 0;
        const isSticky = isDownMd
          ? rect.top <= stickyTop && rect.bottom > stickyTop
          : rect.top === stickyTop;

        if (isSticky) {
          newActiveIndex = index;
        }
      });

      setActiveIndex((prev) =>
        prev !== newActiveIndex ? newActiveIndex : prev,
      );

      // if (isDownMd) {
      // } else {
      //   desktopScrollHandler();
      // }

      // Detectar si el scroll llegó al final (de verdad)
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      const currentReachedEnd = scrollBottom >= docHeight - 1; // margen de tolerancia

      // Solo actualiza si cambió el estado
      if (currentReachedEnd !== lastReachedEndRef.current) {
        lastReachedEndRef.current = currentReachedEnd;
        setReachedEnd(currentReachedEnd);
        toggleMenuOpen(currentReachedEnd);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownMd]);

  useEffect(() => {
    if (data && searchParams) {
      setTimeout(() => {
        const scrollTo = searchParams.get("scrollTo");
        const footer = document.querySelector("#footer-menu");
        if (scrollTo === "footer" && footer) {
          footer.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [searchParams, data]);

  useEffect(() => {
    if (data) {
      document.body.style.overflowY = "auto"; // Habilitar scroll
      document.body.style.opacity = "1"; // Mostrar contenido
    }
  }, [data]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        reachedEnd={reachedEnd}
        id="main-header"
        activeIndex={activeIndex}
      />

      <Hero {...data?.static_texts?.hero} />

      <Box
        sx={{
          display: { lg: "none", xs: "block" },
          height: 60,
          bgcolor: "#6856D9",
        }}
      />

      <MenuItemMobile
        index={1}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#news"
      >
        {t("news")}
      </MenuItemMobile>

      <News newsList={data?.news_tab} />

      <Box
        sx={{
          display: { lg: "none", xs: "block" },
          height: 60,
          bgcolor: "background.default",
        }}
      />

      <MenuItemMobile
        index={2}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#about-network"
      >
        {t("aboutNetwork")}
      </MenuItemMobile>

      <AboutNetwork
        aboutList={data?.about_tab}
        {...data?.static_texts?.about_us}
      />

      <Box
        sx={{
          display: { lg: "none", xs: "block" },
          height: 60,
          bgcolor: "background.paper",
        }}
      />

      <MenuItemMobile
        index={3}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#projects"
      >
        {t("projects")}
      </MenuItemMobile>

      <Projects projectsList={data?.projects_tab} />

      <Box
        sx={{
          display: { lg: "none", xs: "block" },
          height: 60,
          bgcolor: "background.default",
        }}
      />

      <MenuItemMobile
        index={4}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#participate"
      >
        {t("participate")}
      </MenuItemMobile>

      <Participate
        {...data?.static_texts?.participate}
        modal_colaborate={data?.static_texts?.modal_colaborate}
        modal_proposal={data?.static_texts?.modal_proposal}
        modal_resonate={data?.static_texts?.modal_resonate}
      />
      <Footer {...data?.static_texts?.footer} reachedEnd={reachedEnd} />
    </Box>
  );
}
