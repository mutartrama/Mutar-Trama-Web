// lib/storyblok.js

import { Hero } from "@/components/hero/Hero";
import { Page } from "@/components/page/Page";
import { Teaser } from "@/components/teaser/Teaser";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: "5PLTeusccyrdBQaLd6DfVgtt",
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
    hero: Hero,
  },
});
