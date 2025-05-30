import { Link } from "@/i18n/routing";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import Icon from "../icon/Icon";
import { NewsItemProps } from "./news.types";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";
import { truncateText } from "@/lib/truncateText";

export const NewCard = (newCardData: NewsItemProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, xl: 5 },
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
          "& h2": {
            fontSize: { xs: 42, lg: 54, xl: 72 },
            fontFamily: "var(--font-viaoda-libre)",
            margin: 0,
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
      <Typography fontFamily="var(--font-telegraf-800)">
        {newCardData.epigraph}
      </Typography>
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
