"use client";
import { Box, Stack, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";
import { ParticipateDialog } from "./ParticipateDialog";

export const Participate = ({ blok }: any) => {
  const { render } = richTextResolver();

  return (
    <Box
      className="participate-section"
      data-cy="participate"
      {...storyblokEditable(blok)}
      sx={{
        px: 5,
        pt: 30,
        pl: { lg: "calc(120px + 75px * 4 + 2rem)", xl: "calc(160px + 1rem)" },
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("./images/deco_squares.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
      }}
    >
      <Stack gap={12} sx={{ maxWidth: 580 }}>
        <Typography variant="h2" sx={{ fontSize: { lg: 100 }, lineHeight: 1 }}>
          {blok.title}
        </Typography>
        <Box
          sx={{
            fontSize: { lg: 18 },
          }}
          dangerouslySetInnerHTML={{
            __html: render(blok.content) as TrustedHTML,
          }}
        />
        <Stack>
          {blok.dialogs.map((dialog: any, index: number) => (
            <ParticipateDialog blok={dialog} key={index} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
