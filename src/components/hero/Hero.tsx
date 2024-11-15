import { Box, Stack, Typography } from "@mui/material";
import { FlowerHeadPerson } from "./flower-head-person/FlowerHeadPerson";
import Image from "next/image";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { storyblokEditable } from "@storyblok/react";

export const Hero = ({ blok }: Record<any, any>) => {
  return (
    <Stack
      data-cy="hero"
      sx={{
        flexDirection: { xs: "column", lg: "row" },
        bgcolor: "background.paper",
        color: "text.secondary",
        minHeight: "100vh",
        p: 5,
        pb: 2,
        pt: "calc(70px + 1rem)",
        justifyContent: "space-between",
        alignItems: { xs: "stretch", lg: "center" },
        pl: { lg: "calc(120px + 1rem)", xl: "calc(160px + 1rem)" },
        position: "relative",
        overflowX: "hidden",
      }}
      {...storyblokEditable(blok)}
    >
      <Stack gap={8} sx={{ pl: { lg: 10, xl: 32 }, mt: { lg: -16 } }}>
        <Box
          sx={{
            mixBlendMode: "darken",
            display: { xs: "none", lg: "block" },
            position: "relative",
            width: { lg: 638 },
            height: { lg: 104 },
          }}
        >
          <Image
            src="/images/mutar-trama-logo-large.png"
            alt="Mutar Trama"
            fill={true}
          />
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 56, lg: 72, xl: 72 },
            textAlign: { xs: "center", lg: "left" },
            maxWidth: { xs: 335, lg: 658 },
            alignSelf: "center",
          }}
        >
          {blok.title}
        </Typography>
      </Stack>
      <FlowerHeadPerson />
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ display: { lg: "none" } }}
      >
        <SwitchLanguageButton />
      </Stack>
    </Stack>
  );
};
