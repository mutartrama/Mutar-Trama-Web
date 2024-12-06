import { Link } from "@/i18n/routing";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useTranslations } from "next-intl";
import Icon from "../icon/Icon";

export const Footer = ({ blok }: any) => {
  const t = useTranslations("Footer");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: { lg: "flex-end" },
        px: 5,
        pl: { lg: "calc(120px + 75px * 4 + 2rem)", xl: "calc(160px + 1rem)" },
        pt: 24,
        backgroundImage: 'url("./images/deco_echo.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: {
          xs: "top 30% right",
          lg: "top 20% right 10%",
          xl: "top 20% right 20%",
        },
      }}
      data-cy="footer"
      {...storyblokEditable(blok)}
    >
      <Stack
        direction="column"
        gap={8}
        sx={{
          maxWidth: { lg: 302, xl: 400 },
        }}
      >
        <Stack direction="column" gap={5}>
          <Typography
            variant="h6"
            sx={{
              fontSize: 18,
              fontFamily: "var(--font-telegraf-800)",
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              maxWidth: 160,
            }}
          >
            {t("subtitle")}
          </Typography>
          <Box>
            <Button
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
          <Stack
            direction="row"
            sx={{
              bgcolor: "background.default",
              width: 220,
              height: 32,
              border: "1px solid #DFDFDF",
            }}
          >
            <InputBase
              placeholder={t("newsletterInputPlaceholder")}
              sx={{ color: "text.primary", px: 2 }}
            />
            <IconButton
              sx={{
                color: "text.secondary",
                bgcolor: "background.paper",
                borderRadius: 0,
                padding: 1,
                "&:hover, &:focus, &:active": {
                  bgcolor: "background.paper",
                  color: "primary.main",
                },
              }}
            >
              <Icon icon="send" size={24} style={{ opacity: 0.5 }} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction="column" gap={1}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              component="span"
              alignItems="center"
              gap={1}
              sx={{ color: "text.primary" }}
            >
              <Icon icon="arrow-right" size={20} /> {t("contactUsLink")}
            </Stack>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              component="span"
              alignItems="center"
              gap={1}
              sx={{ color: "text.primary" }}
            >
              <Icon icon="arrow-right" size={20} /> {t("termsAndCoditions")}
            </Stack>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              component="span"
              alignItems="center"
              gap={1}
              sx={{ color: "text.primary" }}
            >
              <Icon icon="arrow-right" size={20} /> {t("privacyPolicy")}
            </Stack>
          </Link>
        </Stack>
        <Stack direction="column" gap={4} pb={4}>
          <Typography sx={{ fontSize: 12 }}>{t("ccTitle")}</Typography>
          <Typography sx={{ fontSize: 12 }}>{t("ccText1")}</Typography>
          <Typography sx={{ fontSize: 12 }}>{t("ccText2")}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
