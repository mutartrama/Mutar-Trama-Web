"use client";
import { Box, Stack, Typography } from "@mui/material";
import { ParticipateDialog } from "./ParticipateDialog";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";
import { DecoCircles } from "./DecoCircles";
import { DecoDrops } from "./DecoDrops";
import { DecoArrowsGrid } from "./DecoArrowsGrid";

export const Participate = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Participate");

  useEffect(() => {
    if (contentRef.current) {
      scroll(
        animate(
          contentRef.current as HTMLElement,
          {
            opacity: [0, 1],
            transform: ["translateY(300px)", "translateY(0)"],
          },
          { duration: 1 },
        ),
        {
          target: contentRef.current, // El elemento específico que queremos animar
          offset: ["start end", "end end"],
        },
      );
    }
  }, [contentRef]);

  return (
    <Box
      id="participate"
      className="participate-section"
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Box
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
        <Stack ref={contentRef} gap={12} sx={{ maxWidth: 580 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { lg: 100 }, lineHeight: 1 }}
          >
            {t("title")}
          </Typography>
          <Box
            sx={{
              fontSize: { lg: 18 },
            }}
          >
            <Markdown>{t("description")}</Markdown>
          </Box>
          <Stack>
            <ParticipateDialog
              buttonLabel={t("modalTitle1")}
              content={t("modalText1")}
              image={<DecoCircles />}
            />
            <ParticipateDialog
              buttonLabel={t("modalTitle2")}
              content={t("modalText2")}
              image={<DecoDrops />}
            />
            <ParticipateDialog
              buttonLabel={t("modalTitle3")}
              content={t("modalText3")}
              image={<DecoArrowsGrid />}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
