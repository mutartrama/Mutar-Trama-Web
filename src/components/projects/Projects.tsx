"use client";
import { Box } from "@mui/material";
import { storyblokEditable } from "@storyblok/react";
import { CarouselWrapper } from "../carousel-wrapper/CarouselWrapper";
import { ProjectCard } from "./ProjectsCard";

export const Projects = ({ blok }: any) => {
  return (
    <Box
      data-cy="projects"
      className="home-news"
      {...storyblokEditable(blok)}
      sx={{
        py: 12,
        pl: { lg: "120px", xl: "160px" },
      }}
    >
      <CarouselWrapper
        cardList={blok.cardList.map((card: any) => (
          <div key={blok._uid} className="home-news-card">
            <ProjectCard blok={card} />
          </div>
        ))}
      />
    </Box>
  );
};
