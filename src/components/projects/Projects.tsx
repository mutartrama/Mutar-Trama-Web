"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProjectCard } from "./ProjectsCard";

import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";

export const Projects = ({ blok }: any) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const { isLoaded, pageWrapperRef } = useGlobalNavigationLayout();

  const newsList = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLDivElement>(null);

  const panelCount = blok.cardList.length - 1;

  useEffect(() => {
    if (newsList.current && newsSection.current && pageWrapperRef?.current) {
      scroll(
        animate(newsList.current as any, {
          transform: [
            "none",
            `translateX(-${panelCount * (isLargeScreen ? 50 : 100)}vw )`,
          ],
        }),
        {
          target: newsSection.current,
          container: pageWrapperRef.current as HTMLElement,
        },
      );
    }
  }, [isLargeScreen, pageWrapperRef, panelCount]);

  useEffect(() => {
    if (isLoaded && newsSection.current && pageWrapperRef) {
      scroll(
        animate(
          newsSection.current as HTMLElement,
          {
            opacity: [0, 1],
          },
          { duration: 1 },
        ),
        {
          target: newsSection.current, // El elemento específico que queremos animar
          container: pageWrapperRef.current as HTMLElement,
          offset: ["start end", "start 10%"],
        },
      );
    }
  }, [isLoaded, newsSection, pageWrapperRef]);

  return (
    <Box
      id="projects"
      className="projects-section"
      ref={newsSection}
      sx={{
        width: "100vw",
        position: "relative",
        height: `${panelCount * 100}vh`,
        pl: { lg: "290px", xl: "420px" },
        bgcolor: "background.paper",
      }}
    >
      <Box
        ref={newsList}
        sx={{ display: "flex", position: "sticky", top: 0, flexWrap: "nowrap" }}
      >
        {blok.cardList.map((card: any, index: number) => (
          <Box
            key={index}
            className="projects-card"
            sx={{
              width: { xs: "100vw", lg: "50vw" },
              flex: "0 0 auto",
              height: "100vh",
              pt: { xs: "120px", lg: "50px" },
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              pr: { lg: "100px" },
            }}
          >
            <ProjectCard blok={card} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
