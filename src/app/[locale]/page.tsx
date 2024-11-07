"use client";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { HomeSectionTitle } from "@/components/home-section-title/HomeSectionTitle";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Box } from "@mui/material";

export default function HomePage() {
  const [data, setData] = useState<any>();
  const [locale, setLocale] = useState(
    window.location.pathname.search("es") > 0 ? "es" : "en"
  );

  console.log(window.location.pathname.search("en"), locale);

  useEffect(() => {
    const getData = async () => {
      console.log(locale);

      const { data } = await fetchData(locale);
      console.log(data);

      setData(data);
    };

    getData();
  }, [locale]);

  const isVisible = !!data;

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <Header />
      {/* <Hero /> */}
      {/* <HomeSectionTitle>Novedades</HomeSectionTitle> TODO: mover a storyblok */}
      {data && <StoryblokStory story={data.story} />} {/* TODO: use skeleton */}
    </Box>
  );
}

async function fetchData(locale: string) {
  const version =
    process.env.NODE_ENV === "development" ? "draft" : "published";

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get("cdn/stories/home", {
    version: version,
    language: locale,
  });
}
