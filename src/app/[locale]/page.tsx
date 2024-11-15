"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useLayoutEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { animate, scroll } from "motion";

export default function HomePage() {
  const [data, setData] = useState<any>();
  const locale = useLocalePath();

  const isVisible = !!data;

  useLayoutEffect(() => {
    const homeNewsContainer = document.querySelector(".home-news");
    const homeNewsWrapper = document.querySelector(".home-news-cards");

    if (data?.story && homeNewsContainer && homeNewsWrapper) {
      const total = data.story.content.body.find(
        (e: any) => e.component === "homeNews",
      ).cardList.length;

      if (total) {
        (homeNewsContainer as HTMLDivElement).style.height = `${total}00vh`;

        scroll(
          animate(homeNewsWrapper, {
            transform: ["none", `translateX(-${total - 1}00vw)`],
          }),
          { target: homeNewsContainer },
        );
      }
    }
  }, [data]);

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
      }}
    >
      <Header />
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
