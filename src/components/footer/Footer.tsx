import { Link } from "@/i18n/routing";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Icon from "../icon/Icon";
import { NewsletterField } from "../newsletter-field/NewsletterField";
import { useEffect, useRef, useState } from "react";
import { scroll, animate } from "motion";
import { StaticTextSection } from "@/app/api/responses";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

interface FooterProps extends Partial<StaticTextSection> {
  reachedEnd: boolean;
}

const backgroundColors = ["#1F1F1F", "#0D0D0D"]; // color normal y color reachedEnd

export const Footer = ({ reachedEnd, paragraph, epigraph }: FooterProps) => {
  const t = useTranslations("Footer");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "loading" | "success" | "error" | null
  >(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const backgroundColor = reachedEnd
    ? backgroundColors[1]
    : backgroundColors[0];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubscribeNewsletter = async (email: string) => {
    setNewsletterStatus("loading");
    const res = await fetch("/api/submit-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        tag: "homepage_newsletter",
      }),
    });

    const result = await res.json();

    if (result.success) {
      setNewsletterStatus("success");
    } else {
      setNewsletterStatus("error");
    }

    setTimeout(() => {
      setNewsletterStatus(null);
    }, 3500);
  };

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
      ref={containerRef}
      className="footer-section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: { lg: "flex-end" },
        px: 5,
        pl: { lg: "calc(120px + 75px * 4 + 2rem)", xl: "calc(160px + 1rem)" },
        pt: 24,
        pb: 10,
        bgcolor: backgroundColor,
        backgroundImage: 'url("./images/deco_echo.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: {
          xs: "top -10% left",
          lg: "top 20% right 10%",
          xl: "top 20% right 20%",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Stack
        ref={contentRef}
        direction="column"
        gap={15}
        sx={{
          maxWidth: { lg: 302, xl: 400 },
        }}
      >
        <Stack direction="column" gap={5}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            <MarkdownWrapper>{paragraph}</MarkdownWrapper>
          </Typography>
          <Box>
            <Button
              LinkComponent={Link}
              href="https://buymeacoffee.com/mutar.trama_artcollective"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Icon icon="arrow-right" size={20} />}
              variant="contained"
              sx={{
                bgcolor: "background.paper",
                color: "text.secondary",
              }}
            >
              {t("colaborateButton")}
            </Button>
          </Box>
        </Stack>

        <Stack direction="column" gap={5}>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: "var(--font-telegraf-800)",
            }}
          >
            {t("newsletterTitle")}
          </Typography>
          <Typography>{t("newsletterText")}</Typography>

          <NewsletterField
            onSubmit={handleSubscribeNewsletter}
            status={newsletterStatus}
          />
        </Stack>
        <Stack direction="column" gap={1}>
          <Link
            href="mailto:mutar.trama@gmail.com"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              color="secondary"
              startIcon={<Icon icon="arrow-right" size={20} />}
            >
              {t("contactUsLink")}
            </Button>
          </Link>
          <Link href="/terms-and-conditions" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              color="secondary"
              startIcon={<Icon icon="arrow-right" size={20} />}
            >
              {t("termsAndCoditions")}
            </Button>
          </Link>
          <Link href="/privacy-policy" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              color="secondary"
              startIcon={<Icon icon="arrow-right" size={20} />}
            >
              {t("privacyPolicy")}
            </Button>
          </Link>
        </Stack>
        <Stack direction="column" gap={4} pb={4}>
          <Typography sx={{ fontSize: 12 }}>
            <MarkdownWrapper>{epigraph}</MarkdownWrapper>
          </Typography>
        </Stack>
      </Stack>
      <Box id="footer-menu" />
    </Box>
  );
};
