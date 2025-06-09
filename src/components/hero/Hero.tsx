import { Box, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { StaticTextSection } from "@/app/api/responses";
import { motion } from "framer-motion";
import { useState } from "react";

export const Hero = ({ title }: Partial<StaticTextSection>) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Stack
      id="hero"
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
    >
      <Stack gap={8} sx={{ pl: { lg: 10, xl: 32 }, mt: { lg: -16 } }}>
        <Box
          component={motion.div}
          sx={{
            display: { xs: "none", lg: "block" },
            position: "relative",
            width: { lg: 638 },
            height: { lg: 104 },
          }}
        >
          <Image
            onLoad={() => setImageLoaded(true)}
            src="/images/mutar-trama-logo-large.png"
            alt="Mutar Trama"
            fill
            style={{
              mixBlendMode: "darken",
              opacity: imageLoaded ? 1 : 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              display: imageLoaded ? "none" : "block",
            }}
          >
            <Skeleton
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "grey.100",
                m: 0,
                transform: "scaleY(1)",
              }}
            />
          </Box>
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 56, lg: 72, xl: 72 },
            textAlign: { xs: "center", lg: "left" },
            width: "100%",
            maxWidth: { xs: 335, lg: 658 },
            alignSelf: "center",
            transform: "translateY(20px)",
          }}
        >
          {title ? (
            <Box
              component={motion.span}
              whileInView={{ opacity: 1 }}
              sx={{ opacity: 0 }}
            >
              {title}
            </Box>
          ) : (
            <Box
              component="span"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", lg: "unset" },
              }}
            >
              <Skeleton
                sx={{
                  width: { xs: "45vw", lg: "30vw", xl: "35vw" },
                  bgcolor: "grey.100",
                }}
              />
              <Skeleton
                sx={{
                  width: { xs: "60vw", lg: "35vw", xl: "30vw" },
                  bgcolor: "grey.100",
                }}
              />
              <Skeleton
                sx={{
                  bgcolor: "grey.100",
                  width: { xs: "55vw", lg: "22vw" },
                  display: { xl: "none" },
                }}
              />
              <Skeleton
                width="50vw"
                sx={{
                  bgcolor: "grey.100",
                  display: { lg: "none", xl: "none" },
                }}
              />
            </Box>
          )}
        </Typography>
      </Stack>
      <Box
        component={motion.span}
        whileInView={{ opacity: 1 }}
        sx={{
          opacity: 0,
          mixBlendMode: "darken",
          backgroundColor: "transparent",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto" }}
        >
          <source
            src="/hero-mobile-video.mp4"
            media="(max-width: 768px)"
            type="video/mp4"
          />
          <source
            src="/hero-desktop-video.mp4"
            media="(min-width: 769px)"
            type="video/mp4"
          />
        </video>
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
