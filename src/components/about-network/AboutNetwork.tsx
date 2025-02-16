import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { Box, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { richTextResolver } from "@storyblok/richtext";
import { animate, scroll } from "motion";
import { useEffect, useRef } from "react";

export const AboutNetwork = ({ blok }: any) => {
  const { render } = richTextResolver();

  const { isLoaded, pageWrapperRef } = useGlobalNavigationLayout();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isLoaded && containerRef.current && pageWrapperRef?.current) {
      scroll(
        animate(
          containerRef.current as HTMLElement,
          {
            opacity: [0, 1],
            transform: ["translateY(300px)", "translateY(0)"],
          },
          { duration: 1 },
        ),
        {
          target: containerRef.current, // El elemento específico que queremos animar
          container: pageWrapperRef.current as HTMLElement,
          offset: ["start end", "end end"],
        },
      );
    }
  }, [isLoaded, containerRef, pageWrapperRef]);

  return (
    <Box
      id="about-network"
      className="about-net-section"
      data-cy="aboutNetwork"
      {...storyblokEditable(blok)}
      sx={{ bgcolor: "background.default" }}
    >
      <Box
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
        <Box ref={containerRef} sx={{ maxWidth: 580, opacity: 0 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: 54, xl: 100 },
              lineHeight: 1,
              transform: "translateY(20px)",
            }}
          >
            {blok.title}
          </Typography>
          <Box
            sx={{
              fontSize: { lg: 16, xl: 18 },
              transform: "translateY(20px)",
            }}
            dangerouslySetInnerHTML={{
              __html: render(blok.description) as TrustedHTML,
            }}
          />
          <Box
            dangerouslySetInnerHTML={{
              __html: render(blok.disclaimer) as TrustedHTML,
            }}
            sx={{
              fontSize: 12,
              lineHeight: 1.15,
              transform: "translateY(20px)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
