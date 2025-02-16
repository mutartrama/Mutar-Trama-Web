"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HomeNewsCard } from "./HomeNewsCard";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { ErrorMessage } from "../error-message/error-message";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";

export const HomeNews = ({ blok }: any) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const { isLoaded, pageWrapperRef } = useGlobalNavigationLayout();

  const newsList = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLDivElement>(null);
  const notFoundRef = useRef<HTMLDivElement>(null);

  const panelCount = blok.cardList.length - 1;

  useEffect(() => {
    const pageContainer = document.querySelector(
      ".page-container",
    ) as HTMLElement;
    if (newsList.current && newsSection.current && pageContainer) {
      scroll(
        animate(newsList.current as any, {
          transform: [
            "none",
            `translateX(-${panelCount * window.innerWidth}px )`,
          ],
        }),
        {
          target: newsSection.current,
          container: pageContainer,
        },
      );
    }
  }, [isLargeScreen, panelCount]);

  const hasNews = blok.cardList.length;

  useEffect(() => {
    if (isLoaded && notFoundRef.current && pageWrapperRef?.current) {
      scroll(
        animate(
          notFoundRef.current as HTMLElement,
          {
            opacity: [0, 1],
            transform: ["translateY(300px)", "translateY(0)"],
          },
          { duration: 1 },
        ),
        {
          target: notFoundRef.current, // El elemento específico que queremos animar
          container: pageWrapperRef.current as HTMLElement,
          offset: ["start end", "end end"],
        },
      );
    }
  }, [isLoaded, notFoundRef, pageWrapperRef]);

  return (
    <Box
      id="news"
      className="news-section"
      ref={newsSection}
      sx={{
        width: "100vw",
        position: "relative",
        height: `${panelCount * 100}vh`,
        pl: { lg: "280px" },
        bgcolor: "#6856D9",
      }}
    >
      {hasNews ? (
        <Box
          id="news-wrapper"
          ref={newsList}
          sx={{
            display: "flex",
            position: "sticky",
            top: 0,
            flexWrap: "nowrap",
            width: "fit-content",
          }}
        >
          {blok.cardList.map((card: any, index: number) => (
            <Box
              key={index}
              className="home-news-card"
              sx={{
                width: { xs: "100vw", lg: 800 },
                flex: "0 0 auto",
                height: "100vh",
                pt: { xs: "120px", lg: "25px", xl: "50px" },
              }}
            >
              <HomeNewsCard blok={card} />
            </Box>
          ))}
          <Box sx={{ width: { xl: 300 } }} />
        </Box>
      ) : (
        <Box
          ref={notFoundRef}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ErrorMessage
            deco="rose"
            title="No news found"
            description="We have no news to show, come back later"
          />
        </Box>
      )}
    </Box>
  );
};
