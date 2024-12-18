import { PropsWithChildren } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { AnimatedTitle } from "../animated-title/AnimatedTitle";

export const HomeSectionTitle = ({ blok }: PropsWithChildren<any>) => {
  return (
    <AnimatedTitle
      backgroundColor={blok.backgroundColor}
      to={blok.to}
      {...storyblokEditable(blok)}
    >
      {blok.title}
    </AnimatedTitle>
  );
};
