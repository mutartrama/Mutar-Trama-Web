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
import { GoogleSheetsResponse } from "@/pages/api/responses";
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

        setData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getData();
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      const mobileScrollHandler = () => {
        const items = document.querySelectorAll("[data-sticky-index]");
        let newActiveIndex: number | null = null;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const index = parseInt(item.getAttribute("data-sticky-index")!);
          const stickyTop = 70 + 48 * (index - 1);
          const isSticky = rect.top <= stickyTop && rect.bottom > stickyTop;

          if (isSticky) {
            newActiveIndex = index;
          }
        });

        setActiveIndex((prev) =>
          prev !== newActiveIndex ? newActiveIndex : prev,
        );
      };
      const desktopScrollHandler = () => {
        const items = document.querySelectorAll("[data-sticky-index]");
        let newActiveIndex: number | null = null;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const index = parseInt(item.getAttribute("data-sticky-index")!);
          const stickyTop = 48 * (index - 1);

          const isSticky = rect.top <= stickyTop && rect.bottom > stickyTop;

          if (isSticky) {
            newActiveIndex = index;
          }
        });

        setActiveIndex((prev) =>
          prev !== newActiveIndex ? newActiveIndex : prev,
        );
      };

      if (isDownMd) {
        mobileScrollHandler();
      } else {
        desktopScrollHandler();
      }

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubscribeNewsletter = async () => {
    const res = await fetch("/api/submit-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "prueba2@mail.com",
        tag: "homepage_newsletter",
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert("¡Email guardado!");
    } else {
      alert("Error: " + result.error);
    }
  };

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

      <MenuItemMobile
        index={1}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#news"
      >
        {t("news")}
      </MenuItemMobile>

      <News
        newsList={
          data
            ? [...data?.news_tab, ...data?.news_tab, ...data?.news_tab]
            : undefined
        }
      />

      <MenuItemMobile
        index={2}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#about-network"
      >
        {t("aboutNetwork")}
      </MenuItemMobile>

      <AboutNetwork {...data?.static_texts.about_us} />

      <MenuItemMobile
        index={3}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#projects"
      >
        {t("projects")}
      </MenuItemMobile>

      <Projects projectsList={data?.projects_tab} />

      <MenuItemMobile
        index={4}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#participate"
      >
        {t("participate")}
      </MenuItemMobile>

      <Participate
        {...data?.static_texts.participate}
        modal_colab={data?.static_texts.modal_colab}
        modal_prop={data?.static_texts.modal_prop}
        modal_res={data?.static_texts.modal_res}
      />
      <Footer {...data?.static_texts.footer} reachedEnd={reachedEnd} />
    </Box>
  );
}
