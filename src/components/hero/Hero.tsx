// import { Box, Stack, Typography } from "@mui/material";
// import { FlowerHeadPerson } from "./flower-head-person/FlowerHeadPerson";
// import Image from "next/image";
// import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
// import { useEffect, useRef } from "react";
// import { animate } from "motion";
// import { useTranslations } from "next-intl";

// export const Hero = ({  }: Record<any, any>) => {
//   const t = useTranslations("Hero");
//   const heroImageRef = useRef<HTMLElement>(null);
//   const heroTitleRef = useRef<HTMLElement>(null);
//   const heroAnimRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (heroImageRef.current && heroTitleRef.current && heroAnimRef.current) {
//       animate(heroImageRef.current, { opacity: 1 }, { delay: 1, duration: 1 });
//       animate(
//         heroTitleRef.current,
//         { opacity: 1 },
//         { delay: 1.5, duration: 1 },
//       );
//       animate(heroAnimRef.current, { opacity: 1 }, { delay: 2, duration: 1.5 });
//     }
//   }, [heroImageRef, heroTitleRef, heroAnimRef]);

//   return (
//     <Stack
//       id="hero"
//       className="hero-section"
//       sx={{
//         flexDirection: { xs: "column", lg: "row" },
//         bgcolor: "background.paper",
//         color: "text.secondary",
//         minHeight: "100vh",
//         p: 5,
//         pb: 2,
//         pt: "calc(70px + 1rem)",
//         justifyContent: "space-between",
//         alignItems: { xs: "stretch", lg: "center" },
//         pl: { lg: "calc(120px + 1rem)", xl: "calc(160px + 1rem)" },
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       <Stack gap={8} sx={{ pl: { lg: 10, xl: 32 }, mt: { lg: -16 } }}>
//         <Box
//           ref={heroImageRef}
//           sx={{
//             mixBlendMode: "darken",
//             display: { xs: "none", lg: "block" },
//             position: "relative",
//             width: { lg: 638 },
//             height: { lg: 104 },
//             opacity: 0,
//           }}
//         >
//           <Image
//             src="/images/mutar-trama-logo-large.png"
//             alt="Mutar Trama"
//             fill={true}
//           />
//         </Box>
//         <Typography
//           ref={heroTitleRef}
//           variant="h1"
//           sx={{
//             fontSize: { xs: 56, lg: 72, xl: 72 },
//             textAlign: { xs: "center", lg: "left" },
//             maxWidth: { xs: 335, lg: 658 },
//             alignSelf: "center",
//             opacity: 0,
//           }}
//         >
//           {t("title")}
//         </Typography>
//       </Stack>
//       <Box
//         ref={heroAnimRef}
//         sx={{
//           opacity: 0,
//         }}
//       >
//         <FlowerHeadPerson />
//       </Box>
//       <Stack
//         justifyContent="center"
//         alignItems="center"
//         sx={{ display: { lg: "none" } }}
//       >
//         <SwitchLanguageButton />
//       </Stack>
//     </Stack>
//   );
// };

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { StaticTextSection } from "@/pages/api/responses";

export const Hero = (props: Partial<StaticTextSection>) => {
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
          className="fade-in"
          sx={{
            mixBlendMode: "darken",
            display: { xs: "none", lg: "block" },
            position: "relative",
            width: { lg: 638 },
            height: { lg: 104 },
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          <Image
            src="/images/mutar-trama-logo-large.png"
            alt="Mutar Trama"
            fill
          />
        </Box>
        <Typography
          className="fade-in"
          variant="h1"
          sx={{
            fontSize: { xs: 56, lg: 72, xl: 72 },
            textAlign: { xs: "center", lg: "left" },
            maxWidth: { xs: 335, lg: 658 },
            alignSelf: "center",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {props?.title}
        </Typography>
      </Stack>
      <Box
        className="fade-in"
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
