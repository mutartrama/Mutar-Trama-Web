import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

export const Page = ({ blok }: Record<any, any>) => {
  const { pageWrapperRef } = useGlobalNavigationLayout();

  return (
    <main
      ref={pageWrapperRef}
      data-cy="page"
      className="page-container"
      {...storyblokEditable(blok)}
    >
      {blok.body?.map((nestedBlok: Record<any, any>) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};
