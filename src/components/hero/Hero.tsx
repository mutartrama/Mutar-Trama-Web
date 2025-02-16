import { Box, Stack, Typography } from "@mui/material";
import { FlowerHeadPerson } from "./flower-head-person/FlowerHeadPerson";
import Image from "next/image";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { storyblokEditable } from "@storyblok/react";
import { useEffect, useRef } from "react";
import { animate } from "motion";

export const Hero = ({ blok }: Record<any, any>) => {
  const heroImageRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLElement>(null);
  const heroAnimRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroImageRef.current && heroTitleRef.current && heroAnimRef.current) {
      animate(heroImageRef.current, { opacity: 1 }, { delay: 1, duration: 1 });
      animate(
        heroTitleRef.current,
        { opacity: 1 },
        { delay: 1.5, duration: 1 },
      );
      animate(heroAnimRef.current, { opacity: 1 }, { delay: 2, duration: 1.5 });
    }
  }, [heroImageRef, heroTitleRef, heroAnimRef]);

  return (
    <Stack
      id="hero"
      data-cy="hero"
      className="hero-section"
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
          ref={heroImageRef}
          sx={{
            mixBlendMode: "darken",
            display: { xs: "none", lg: "block" },
            position: "relative",
            width: { lg: 638 },
            height: { lg: 104 },
            opacity: 0,
          }}
        >
          <Image
            src="/images/mutar-trama-logo-large.png"
            alt="Mutar Trama"
            fill={true}
          />
        </Box>
        <Typography
          ref={heroTitleRef}
          variant="h1"
          sx={{
            fontSize: { xs: 56, lg: 72, xl: 72 },
            textAlign: { xs: "center", lg: "left" },
            maxWidth: { xs: 335, lg: 658 },
            alignSelf: "center",
            opacity: 0,
          }}
        >
          {blok.title}
        </Typography>
      </Stack>
      <Box
        ref={heroAnimRef}
        sx={{
          opacity: 0,
        }}
      >
        <FlowerHeadPerson />
      </Box>
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
