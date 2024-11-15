"use client";
import { Box, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";
import { ParticipateDialog } from "./ParticipateDialog";

export const Participate = ({ blok }: any) => {
  const { render } = richTextResolver();

  return (
    <Box
      data-cy="participate"
      {...storyblokEditable(blok)}
      sx={{
        px: 5,
        pl: { lg: "calc(120px + 1rem)", xl: "calc(160px + 1rem)" },
      }}
    >
      <Typography variant="h2">{blok.title}</Typography>
      <Box
        dangerouslySetInnerHTML={{
          __html: render(blok.content) as TrustedHTML,
        }}
      />
      {blok.dialogs.map((dialog: any, index: number) => (
        <ParticipateDialog blok={dialog} key={index} />
      ))}
    </Box>
  );
};
