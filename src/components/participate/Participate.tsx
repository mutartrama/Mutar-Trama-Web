"use client";
import { Box, Stack, Typography } from "@mui/material";
import { ParticipateDialog } from "./ParticipateDialog";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { DecoCircles } from "./DecoCircles";
import { DecoDrops } from "./DecoDrops";
import { DecoArrowsGrid } from "./DecoArrowsGrid";
import { StaticTextSection } from "@/app/api/responses";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

interface ParticipateProps extends StaticTextSection {
  modal_proposal: StaticTextSection;
  modal_colaborate: StaticTextSection;
  modal_resonate: StaticTextSection;
}

export const Participate = ({
  title,
  paragraph,
  modal_colaborate,
  modal_proposal,
  modal_resonate,
}: Partial<ParticipateProps>) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
            sx={{
              fontSize: { lg: 54, xl: 100 },
              lineHeight: 1,
              transform: "translateY(20px)",
            }}
          >
            <MarkdownWrapper>{title}</MarkdownWrapper>
          </Typography>
          <Box
            sx={{
              fontSize: { lg: 18 },
            }}
          >
            <MarkdownWrapper>{paragraph}</MarkdownWrapper>
          </Box>
          <Stack>
            <ParticipateDialog
              buttonLabel={modal_resonate?.title}
              content={modal_resonate?.epigraph}
              image={<DecoCircles />}
            />
            <ParticipateDialog
              buttonLabel={modal_colaborate?.title}
              content={modal_colaborate?.epigraph}
              image={<DecoDrops />}
            />
            <ParticipateDialog
              buttonLabel={modal_proposal?.title}
              content={modal_proposal?.epigraph}
              image={<DecoArrowsGrid />}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
