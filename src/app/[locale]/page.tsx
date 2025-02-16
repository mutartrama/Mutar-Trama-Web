"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import "./page.css";

export default function HomePage() {
  const [data, setData] = useState<any>();
  const locale = useLocalePath();

  const { hasLoadedData } = useGlobalNavigationLayout();

  const isVisible = !!data;

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchData(locale);
      setData(data);
      hasLoadedData(!!data);
    };
    getData();
  }, [locale, hasLoadedData]);

  return (
    <>
      <Header id="main-header" />
      {isVisible && <StoryblokStory story={data.story} />}
    </>
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
