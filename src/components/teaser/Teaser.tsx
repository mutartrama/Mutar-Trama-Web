import { storyblokEditable } from "@storyblok/react/rsc";

export const Teaser = ({ blok }: any) => {
  return (
    <h2 data-cy="teaser" {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
};
