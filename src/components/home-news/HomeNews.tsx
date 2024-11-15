"use client";
import { Box } from "@mui/material";
import { NewsSliderMobile } from "./NewsSliderMobile";
import { storyblokEditable } from "@storyblok/react";
import { HomeNewsCard } from "./HomeNewsCard";

export const HomeNews = ({ blok }: any) => {
  return (
    <Box
      data-cy="homeNews"
      className="home-news"
      {...storyblokEditable(blok)}
      sx={{
        py: 12,
        bgcolor: "altColors.background",
        pl: { lg: "120px", xl: "160px" },
      }}
    >
      <NewsSliderMobile
        cardList={blok.cardList.map((card: any) => (
          <div key={blok._uid} className="home-news-card">
            <HomeNewsCard blok={card} />
          </div>
        ))}
      />
    </Box>
  );
};
