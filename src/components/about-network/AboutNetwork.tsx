import { Box, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";

export const AboutNetwork = ({ blok }: any) => {
  const { render } = richTextResolver();

  return (
    <Box
      data-cy="aboutNetwork"
      {...storyblokEditable(blok)}
      sx={{
        pt: 10,
        px: 5,
        pl: { lg: "calc(120px + 1rem)", xl: "calc(160px + 1rem)" },
      }}
    >
      <Typography variant="h2">{blok.title}</Typography>
      <Box
        dangerouslySetInnerHTML={{
          __html: render(blok.description) as TrustedHTML,
        }}
      />
      <Box
        dangerouslySetInnerHTML={{
          __html: render(blok.disclaimer) as TrustedHTML,
        }}
        sx={{ fontSize: 12, lineHeight: 1.15 }}
      />
    </Box>
  );
};
