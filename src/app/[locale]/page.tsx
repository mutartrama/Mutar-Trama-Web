"use client";
import { Header } from "@/components/header/Header";
import { useEffect, useRef, useState } from "react";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Hero } from "@/components/hero/Hero";
import { News } from "@/components/news/News";
import { AboutNetwork } from "@/components/about-network/AboutNetwork";
import { Projects } from "@/components/projects/Projects";
import { MenuItemMobile } from "@/components/menu/MenuItemMobile";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/footer/Footer";
import "./page.css";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { Participate } from "@/components/participate/Participate";
import { SkeletonContent } from "@/components/skeleton/skeleton";
import { useSearchParams } from "next/navigation";

interface DataResponse {
  newsList: any[];
  aboutList: any[];
  projectsList: any[];
}

export default function HomePage() {
  const t = useTranslations("MenuItems");
  const locale = useLocalePath();
  const searchParams = useSearchParams();

  const { toggleMenuOpen } = useGlobalNavigationLayout();

  const lastReachedEndRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<DataResponse>();
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/fetch-content?lang=${locale}`, {
          cache: "force-cache",
          next: { revalidate: 1800 }, // 30 minutes
        });
        const { data } = await res.json();

        setData({
          newsList: data.news_tab,
          aboutList: data.about_tab,
          projectsList: data.projects_tab,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
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
        const stickyTop = 70 + 48 * (index - 1);
        const isSticky = rect.top <= stickyTop && rect.bottom > stickyTop;

        if (isSticky) {
          newActiveIndex = index;
        }
      });

      setActiveIndex((prev) =>
        prev !== newActiveIndex ? newActiveIndex : prev,
      );
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
  }, []);

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

  console.log(data);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        reachedEnd={reachedEnd}
        id="main-header"
        activeIndex={activeIndex}
      />

      <Hero />

      <MenuItemMobile
        index={1}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#news"
      >
        {t("news")}
      </MenuItemMobile>

      {data?.newsList && <News newsList={data.newsList} />}

      <MenuItemMobile
        index={2}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#about-network"
      >
        {t("aboutNetwork")}
      </MenuItemMobile>

      {data ? <AboutNetwork /> : <SkeletonContent />}

      <MenuItemMobile
        index={3}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#projects"
      >
        {t("projects")}
      </MenuItemMobile>

      {data?.projectsList && <Projects projectsList={data.projectsList} />}

      <MenuItemMobile
        index={4}
        reachedEnd={reachedEnd}
        activeIndex={activeIndex}
        href="#participate"
      >
        {t("participate")}
      </MenuItemMobile>

      <Participate />
      <Footer reachedEnd={reachedEnd} />
    </Box>
  );
}
