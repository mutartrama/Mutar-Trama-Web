// components/StoryblokProvider.jsx
"use client";

import { getStoryblokApi } from "@/lib/storyblok";
import { PropsWithChildren } from "react";

export const StoryblokProvider = ({ children }: PropsWithChildren) => {
  getStoryblokApi();
  return children;
};
