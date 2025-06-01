"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProjectCard } from "./ProjectsCard";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { ProjectsTabItem } from "@/pages/api/responses";

interface ProjectsProps {
  projectsList: ProjectsTabItem[];
}

export const Projects = ({ projectsList }: Partial<ProjectsProps>) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const newsList = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLDivElement>(null);

  const panelCount = (projectsList?.length || 2) - 1;

  useEffect(() => {
    if (newsList.current && newsSection.current) {
      scroll(
        animate(newsList.current as any, {
          transform: [
            "none",
            `translateX(-${panelCount * (isLargeScreen ? 50 : 100)}vw )`,
          ],
        }),
        {
          target: newsSection.current,
        },
      );
    }
  }, [isLargeScreen, panelCount]);

  useEffect(() => {
    if (newsSection.current) {
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
          offset: ["start end", "start 10%"],
        },
      );
    }
  }, [newsSection]);

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
        {projectsList?.map(
          ({ key, ...data }: ProjectsTabItem, index: number) => (
            <Box
              key={`${key}-${index}`}
              className="projects-card"
              sx={{
                width: { xs: "100vw", lg: "50vw" },
                flex: "0 0 auto",
                height: "100vh",
                pt: { xs: "120px", lg: "50px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                pr: { lg: "100px" },
              }}
            >
              <ProjectCard key={key} {...data} />
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
};
