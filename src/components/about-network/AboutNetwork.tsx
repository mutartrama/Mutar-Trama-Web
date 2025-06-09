// import { StaticTextSection } from "@/app/api/responses";
// import { Box, Typography } from "@mui/material";
// import { animate, scroll } from "motion";
// import { useEffect, useRef } from "react";
// import { AboutItemProps } from "./about.types";
// import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

// interface AboutNetworkProps extends Partial<StaticTextSection> {
//   aboutList?: AboutItemProps[];
// }

// export const AboutNetwork = ({
//   title,
//   paragraph,
//   epigraph,
// }: Partial<AboutNetworkProps>) => {
//   const containerRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       scroll(
//         animate(
//           containerRef.current as HTMLElement,
//           {
//             opacity: [0, 1],
//             transform: ["translateY(300px)", "translateY(0)"],
//           },
//           { duration: 1 },
//         ),
//         {
//           target: containerRef.current, // El elemento específico que queremos animar
//           offset: ["start end", "end end"],
//         },
//       );
//     }
//   }, [containerRef]);

//   return (
//     <Box id="about-network" sx={{ bgcolor: "background.default" }}>
//       <Box
//         sx={{
//           px: 5,
//           pl: { lg: "calc(120px + 75px * 2 + 1rem)", xl: "calc(160px + 1rem)" },
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           backgroundImage: 'url("./images/deco_flag.png")',
//         }}
//       >
//         <Box
//           ref={containerRef}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: { xs: 10, md: 10, lg: 15, xl: 20 },
//             maxWidth: 580,
//             opacity: 0,
//             "& p": { p: 0, m: 0, mb: 4 },
//           }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: { lg: 54, xl: 100 },
//               lineHeight: 1,
//               transform: "translateY(20px)",
//             }}
//           >
//             <MarkdownWrapper>{title}</MarkdownWrapper>
//           </Typography>
//           <Box
//             sx={{
//               fontSize: { lg: 16, xl: 18 },
//               transform: "translateY(20px)",
//             }}
//           >
//             <MarkdownWrapper>{paragraph}</MarkdownWrapper>
//           </Box>
//           <Box
//             sx={{
//               fontSize: 12,
//               lineHeight: 1.15,
//               transform: "translateY(20px)",
//             }}
//           >
//             <MarkdownWrapper>{epigraph}</MarkdownWrapper>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AboutCard } from "./AboutCard";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { AboutTabItem, StaticTextSection } from "@/app/api/responses";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

interface AboutNetworkProps extends Partial<StaticTextSection> {
  aboutList?: AboutTabItem[];
}

export const AboutNetwork = ({
  aboutList,
  ...rest
}: Partial<AboutNetworkProps>) => {
  // aboutList = aboutList ? [...aboutList, ...aboutList] : [];
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const newsList = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLDivElement>(null);
  const firstPanelRef = useRef<HTMLDivElement>(null);

  let panelCount = aboutList?.length || 2;
  panelCount = aboutList?.length == 2 ? 2 : panelCount;
  console.log(aboutList, panelCount);

  useEffect(() => {
    if (newsList.current && newsSection.current) {
      scroll(
        animate(newsList.current as any, {
          transform: [
            "none",
            `translateX(-${panelCount * (isLargeScreen ? 60 : 100)}vw )`,
          ],
        }),
        {
          target: newsSection.current,
        },
      );
    }
  }, [isLargeScreen, panelCount]);

  useEffect(() => {
    if (newsList.current) {
      scroll(
        animate(
          newsList.current as HTMLElement,
          {
            opacity: [0, 1],
            y: [200, 0],
          },
          { duration: 1 },
        ),
        {
          target: newsList.current, // El elemento específico que queremos animar
          offset: ["start end", "start 10%"],
        },
      );
    }
  }, [newsList]);

  return (
    <Box
      id="about-network"
      ref={newsSection}
      sx={{
        width: "100vw",
        position: "relative",
        height: `${panelCount * 100 + 60}vh`,
        pl: { lg: "390px", xl: "420px" },
        bgcolor: "background.default",
      }}
    >
      <Box
        ref={newsList}
        sx={{ display: "flex", position: "sticky", top: 0, flexWrap: "nowrap" }}
      >
        <Box
          ref={firstPanelRef}
          sx={{ position: "relative", width: { xs: "100vw", lg: "60vw" } }}
        >
          <FirstPanel key="default-panel" {...rest} />
        </Box>
        {aboutList?.map(({ key, ...data }: AboutTabItem, index: number) => (
          <Box
            key={`${key}-${index}`}
            className="projects-card"
            sx={{
              width: { xs: "100vw", lg: "60vw" },
              flex: "0 0 auto",
              height: "100vh",
              pt: { xs: "120px", lg: "50px" },
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "flex-end", lg: "center" },
              pr: { lg: "100px" },
            }}
          >
            <AboutCard key={key} {...data} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const FirstPanel = ({
  title,
  paragraph,
  epigraph,
}: Partial<AboutNetworkProps>) => {
  return (
    <Box
      sx={{
        width: { xs: "100vw", lg: "60vw" },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: { xs: "flex-end", lg: "center" },
        gap: { xs: 10, md: 10, lg: 15, xl: 20 },
        maxWidth: { lg: "55vw" },
        p: 5,
        pr: { lg: 25 },
        "& p": { p: 0, m: 0, mb: 4 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { lg: 54, xl: 100 },
          lineHeight: 1,
        }}
      >
        <MarkdownWrapper>{title}</MarkdownWrapper>
      </Typography>
      <Box
        sx={{
          fontSize: { lg: 16, xl: 18 },
        }}
      >
        <MarkdownWrapper>{paragraph}</MarkdownWrapper>
      </Box>
      <Box
        sx={{
          fontSize: 12,
          lineHeight: 1.15,
        }}
      >
        <MarkdownWrapper>{epigraph}</MarkdownWrapper>
      </Box>
    </Box>
  );
};
