"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { LegalsTitle } from "@/components/legals-title/legals-title";

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
        pt: "70px",
        bgcolor: "primary.main",
        pb: 10,
      }}
    >
      <Header bgcolor="primary.main" fill="#DFDFDF" />
      <LegalsTitle />
      <Box
        sx={{
          px: 5,
          pl: { lg: "240px" },
          py: 10,
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
  return storyblokApi.get("cdn/stories/terms-and-conditions", {
    version: version,
    language: locale,
  });
}
