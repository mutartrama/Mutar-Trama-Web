"use client";
import { Header } from "@/components/header/Header";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import { useLocalePath } from "@/hooks/useLocalePath";
import "./page.css";

export default function HomePage() {
  const [data, setData] = useState<any>();
  const locale = useLocalePath();

  const isVisible = !!data;

  useEffect(() => {
    if (data) {
      console.log(data);
      const totalNews = data.story.content.body.find(
        (i: any) => i.component === "homeNews",
      ).cardList.length;
      console.log(totalNews);
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
    <>
      <Header />
      {isVisible && <StoryblokStory story={data.story} />}{" "}
      {/* TODO: use skeleton */}
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
