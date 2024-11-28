// lib/storyblok.js

import { AboutNetwork } from "@/components/about-network/AboutNetwork";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { HomeNews } from "@/components/home-news/HomeNews";
import { HomeNewsCard } from "@/components/home-news/HomeNewsCard";
import { HomeSectionTitle } from "@/components/home-section-title/HomeSectionTitle";
import { Page } from "@/components/page/Page";
import { Participate } from "@/components/participate/Participate";
import { ParticipateDialog } from "@/components/participate/ParticipateDialog";
import { Projects } from "@/components/projects/Projects";
import { ProjectCard } from "@/components/projects/ProjectsCard";
import { RichTextContent } from "@/components/rich-text-content/RichTextContent";
import { Teaser } from "@/components/teaser/Teaser";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: "5PLTeusccyrdBQaLd6DfVgtt",
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
    hero: Hero,
    homeTitle: HomeSectionTitle,
    homeNews: HomeNews,
    homeNewsCard: HomeNewsCard,
    aboutNetwork: AboutNetwork,
    projects: Projects,
    projectsCard: ProjectCard,
    participate: Participate,
    participateDialog: ParticipateDialog,
    footer: Footer,
    richTextContent: RichTextContent,
  },
});
