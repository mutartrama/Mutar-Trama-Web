import { Box, Typography } from "@mui/material";
import { animate, scroll } from "motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

export const AboutNetwork = ({}: any) => {
  const t = useTranslations("AboutNetwork");
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
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
          offset: ["start end", "end end"],
        },
      );
    }
  }, [containerRef]);

  return (
    <Box id="about-network" sx={{ bgcolor: "background.default" }}>
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
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { md: 10, lg: 15, xl: 20 },
            maxWidth: 580,
            opacity: 0,
            "& p": { p: 0, m: 0, mb: 4 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: 54, xl: 100 },
              lineHeight: 1,
              transform: "translateY(20px)",
            }}
          >
            {t("title")}
          </Typography>
          <Box
            sx={{
              fontSize: { lg: 16, xl: 18 },
              transform: "translateY(20px)",
            }}
          >
            <Markdown>{t("text1")}</Markdown>
            <Markdown>{t("text2")}</Markdown>
            <Markdown>{t("text3")}</Markdown>
          </Box>
          <Box
            sx={{
              fontSize: 12,
              lineHeight: 1.15,
              transform: "translateY(20px)",
            }}
          >
            {t("disclaimer")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
