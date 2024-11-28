import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

export const Page = ({ blok }: Record<any, any>) => {
  return (
    <main data-cy="page" {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok: Record<any, any>) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};
