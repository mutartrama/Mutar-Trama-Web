import { Box } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";

export const RichTextContent = ({ blok }: any) => {
  const { render } = richTextResolver();
  console.log(blok);

  return (
    <Box
      sx={{
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          marginBlockStart: 0,
          marginBlockEnd: ".5em",
        },
        "& h1": {
          fontFamily: "var(--font-viaoda-libre)",
          fontSize: 56,
          lineHeight: 1,
          fontWeight: 400,
          marginBlockEnd: "1em",
        },
        "& h4": {
          fontSize: 18,
          fontFamily: "var(--font-telegraf-800)",
        },
        "& p": {
          marginBlockStart: 0,
          marginBlockEnd: "2em",
        },
        "& ul": {
          paddingLeft: 5,
        },
        "& ul li:not(:last-child) p": {
          marginBlock: 0,
        },
      }}
      data-cy="rich-text-content"
      {...storyblokEditable(blok)}
      dangerouslySetInnerHTML={{
        __html: render(blok.content) as TrustedHTML,
      }}
    />
  );
};
