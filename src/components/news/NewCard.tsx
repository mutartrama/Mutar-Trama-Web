import { Link } from "@/i18n/routing";
import { Box, Button, Card, CardMedia } from "@mui/material";
import Image from "next/image";
import Icon from "../icon/Icon";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";
import { truncateText } from "@/lib/truncateText";
import { NewsTabItem } from "@/pages/api/responses";

export const NewCard = (newCardData: NewsTabItem) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 10, xl: 5 },
        borderRadius: 0,
        border: "none",
        pb: 5,
        px: { xs: 5, lg: 20 },
        maxWidth: { lg: 800 },
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          "& *": {
            fontSize: { xs: 42, lg: 54, xl: 72 },
            fontFamily: "var(--font-viaoda-libre)",
            margin: 0,
            lineHeight: 1,
            fontWeight: 400,
          },
        }}
      >
        <MarkdownWrapper>{newCardData.title}</MarkdownWrapper>
      </Box>
      <CardMedia
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { lg: 400, xl: 680 },
          maxHeight: { xs: 115, lg: "auto" },
          "&:before": { content: '""', display: "block", pt: "56.25%" },
        }}
      >
        <Image
          src={newCardData.image}
          alt={newCardData.title}
          fill
          style={{ objectFit: "cover" }}
        ></Image>
      </CardMedia>
      <Box
        sx={{
          fontFamily: "var(--font-telegraf-800)",

          "& p": {
            margin: 0,
          },
        }}
      >
        <MarkdownWrapper>{newCardData.epigraph}</MarkdownWrapper>
      </Box>
      <MarkdownWrapper>
        {truncateText(newCardData.paragraph, 150)}
      </MarkdownWrapper>
      <Link href={newCardData.btnUrl}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="arrow-right" size={20} />}
        >
          {newCardData.btnLabel}
        </Button>
      </Link>
    </Card>
  );
};
