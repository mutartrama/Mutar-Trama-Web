"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { AnimatedTitle } from "@/components/animated-title/AnimatedTitle";
import Icon from "@/components/icon/Icon";

export default function HomePage() {
  const [data, setData] = useState<any>();
  const locale = useLocalePath();

  const isVisible = !!data;

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchData(locale);
      setData(data);
    };
    getData();
  }, [locale]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease-in-out",
        pt: { xs: "75px", lg: 0 },
        bgcolor: "primary.main",
        pb: 10,
      }}
    >
      <Header bgcolor="primary.main" fill="#DFDFDF" />
      <Box
        sx={{
          position: "fixed",
          zIndex: 10,
          top: { xs: "70px", lg: 1 },
          left: 0,
          width: "100vw",
          display: { xs: "block", lg: "none" },
        }}
      >
        <Typography
          data-cy="homeTitle"
          className="home-section-title"
          sx={{
            fontSize: 32,
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "sticky",
            bgcolor: "primary.main",
            color: "#DFDFDF",
            px: 4,
            py: 2,
            height: 64,
            transition: "all 100ms",
          }}
        >
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 40,
              transition: "all 100ms",
            }}
          >
            <Icon icon="asterisk" size={40} color="inherit" />
          </Box>
          Legales
        </Typography>
      </Box>

      <Box
        sx={{
          position: "fixed",
          zIndex: 10,
          top: 1,
          left: "120px",
          display: { xs: "none", lg: "block" },
        }}
      >
        <AnimatedTitle
          disableBorder={true}
          backgroundColor="primary.main"
          indexPosition={0}
        >
          Legales
        </AnimatedTitle>
      </Box>
      <Box
        sx={{
          px: 5,
          pl: { lg: "240px" },
          py: 10,
          pt: "100px",
        }}
      >
        {data && <StoryblokStory story={data.story} />}
      </Box>
    </Box>
  );
}

async function fetchData(locale: string) {
  const version =
    process.env.NODE_ENV === "development" ? "draft" : "published";

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get("cdn/stories/privacy-policy", {
    version: version,
    language: locale,
  });
}
