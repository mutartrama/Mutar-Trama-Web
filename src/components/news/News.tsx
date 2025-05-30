"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { NewsItemProps } from "./news.types";
import { NewCard } from "./NewCard";

interface News {
  newsList: NewsItemProps[];
}

export const News = ({ newsList }: News) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const newsListRef = useRef<HTMLDivElement>(null);
  const newsSectionRef = useRef<HTMLDivElement>(null);

  const panelCount = Math.max(newsList.length, newsList.length > 1 ? 2 : 1); // Asegura al menos 2 paneles (scroll de 100vh)

  useEffect(() => {
    if (newsList.length < 2) return;

    const panelWidth = isLargeScreen ? 800 : window.innerWidth;

    if (newsListRef.current && newsSectionRef.current) {
      scroll(
        animate(newsListRef.current as any, {
          transform: [
            "none",
            `translateX(-${(newsList.length - 1) * panelWidth}px )`,
          ],
        }),
        {
          target: newsSectionRef.current,
        },
      );
    }
  }, [isLargeScreen, newsList.length]);

  return (
    <Box
      id="news"
      className="news-section"
      ref={newsSectionRef}
      sx={{
        width: "100vw",
        position: "relative",
        height: `${panelCount * 100}vh`,
        pl: { lg: "280px" },
        bgcolor: "#6856D9",
      }}
    >
      <Box
        id="news-wrapper"
        ref={newsListRef}
        sx={{
          display: "flex",
          position: "sticky",
          top: 0,
          flexWrap: "nowrap",
          width: "fit-content",
        }}
      >
        {newsList.map(({ key, ...data }: NewsItemProps, index: number) => (
          <Box
            key={`${key}-${index}`}
            className="home-news-card"
            sx={{
              width: { xs: "100vw", lg: 800 },
              flex: "0 0 auto",
              height: "100vh",
              pt: { xs: "120px", lg: "25px", xl: "50px" },
            }}
          >
            <NewCard {...data} />
          </Box>
        ))}
        <Box sx={{ width: { lg: 400 } }} />
      </Box>
    </Box>
  );
};
