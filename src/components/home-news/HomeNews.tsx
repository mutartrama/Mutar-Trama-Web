"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HomeNewsCard } from "./HomeNewsCard";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";

export const HomeNews = ({ blok }: any) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const newsList = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLDivElement>(null);

  const panelCount = blok.cardList.length - 1;

  useEffect(() => {
    if (newsList.current && newsSection.current) {
      scroll(
        animate(newsList.current as any, {
          transform: [
            "none",
            `translateX(-${panelCount * (isLargeScreen ? 70 : 100)}vw )`,
          ],
        }),
        { target: newsSection.current },
      );
    }
  }, [isLargeScreen, panelCount]);

  return (
    <Box
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
      <Box
        ref={newsList}
        sx={{ display: "flex", position: "sticky", top: 0, flexWrap: "nowrap" }}
      >
        {blok.cardList.map((card: any, index: number) => (
          <Box
            key={index}
            className="home-news-card"
            sx={{
              width: { xs: "100vw", lg: "70vw" },
              flex: "0 0 auto",
              height: "100vh",
              pt: { xs: "120px", lg: "50px" },
            }}
          >
            <HomeNewsCard blok={card} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
