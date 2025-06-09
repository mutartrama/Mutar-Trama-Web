"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { NewCard } from "./NewCard";
import { NewsTabItem, StaticTextSection } from "@/app/api/responses";

interface NewsProps extends Partial<StaticTextSection> {
  newsList: NewsTabItem[];
}

export const News = ({ newsList }: Partial<NewsProps>) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const newsListRef = useRef<HTMLDivElement>(null);
  const newsSectionRef = useRef<HTMLDivElement>(null);

  const newsListLength = newsList?.length || 1;
  const panelCount = Math.max(newsListLength, newsListLength > 1 ? 2 : 1); // Asegura al menos 2 paneles (scroll de 100vh)

  useEffect(() => {
    if (newsListLength < 2) return;

    const panelWidth = isLargeScreen ? 800 : window.innerWidth;

    if (newsListRef.current && newsSectionRef.current) {
      scroll(
        animate(newsListRef.current as any, {
          transform: [
            "none",
            `translateX(-${(newsListLength - 1) * panelWidth}px )`,
          ],
        }),
        {
          target: newsSectionRef.current,
        },
      );
    }
  }, [isLargeScreen, newsListLength]);

  useEffect(() => {
    if (newsListRef.current) {
      scroll(
        animate(
          newsListRef.current as HTMLElement,
          {
            opacity: [0, 1],
          },
          { duration: 1 },
        ),
        {
          target: newsListRef.current, // El elemento específico que queremos animar
          offset: ["start end", "start 10%"],
        },
      );
    }
  }, [newsListRef]);

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
        {newsList?.map(({ key, ...data }: NewsTabItem, index: number) => (
          <Box
            key={`${key}-${index}`}
            className="home-news-card"
            sx={{
              width: { xs: "100vw", lg: 800, xl: "60vw" },
              flex: "0 0 auto",
              height: "100vh",
            }}
          >
            <NewCard key={key} {...data} />
          </Box>
        ))}
        <Box sx={{ width: { lg: 400 } }} />
      </Box>
    </Box>
  );
};
