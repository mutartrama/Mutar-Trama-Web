"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { AnimatedTitleMobile } from "@/components/animated-title/AnimatedTitleMobile";

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
        pt: "75px",
        bgcolor: "secondary.main",
        pb: 10,
        pl: { lg: "120px", xl: "160px" },
      }}
    >
      <Header bgcolor="secondary.main" />

      <AnimatedTitleMobile backgroundColor="secondary.main">
        Legales
      </AnimatedTitleMobile>
      <Box
        sx={{
          px: 5,
          py: 10,
          maxWidth: 820,
          mx: "auto",
        }}
      >
        {data && <StoryblokStory story={data.story} />}{" "}
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
