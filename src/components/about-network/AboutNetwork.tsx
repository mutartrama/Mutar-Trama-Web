import { Box, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";

export const AboutNetwork = ({ blok }: any) => {
  const { render } = richTextResolver();

  return (
    <Box
      className="about-net-section"
      data-cy="aboutNetwork"
      {...storyblokEditable(blok)}
      sx={{
        px: 5,
        pl: { lg: "calc(120px + 75px * 2 + 1rem)", xl: "calc(160px + 1rem)" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: 'url("./images/deco_flag.png")',
      }}
    >
      <Box sx={{ maxWidth: 580 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { lg: 72, xl: 100 },
            lineHeight: 1,
          }}
        >
          {blok.title}
        </Typography>
        <Box
          sx={{
            fontSize: { lg: 16, xl: 18 },
          }}
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
    </Box>
  );
};
