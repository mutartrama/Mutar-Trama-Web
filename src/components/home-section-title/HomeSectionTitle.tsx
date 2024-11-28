import { PropsWithChildren } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { AnimatedTitle } from "../animated-title/AnimatedTitle";

export const HomeSectionTitle = ({ blok }: PropsWithChildren<any>) => {
  return (
    <AnimatedTitle
      backgroundColor={blok.backgroundColor}
      {...storyblokEditable(blok)}
    >
      {blok.title}
    </AnimatedTitle>
  );
};
