import { Link } from "@/i18n/routing";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import Icon from "../icon/Icon";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";
import { NewsTabItem } from "@/app/api/responses";
import { useState } from "react";
import { CustomDialog } from "../custom-dialog/CustomDialog";
import { motion } from "framer-motion";

const ContentPanel = ({
  title,
  image,
  paragraph,
  epigraph,
  btnUrl,
  btnLabel,
  truncate,
}: Partial<NewsTabItem> & { truncate: boolean }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: truncate ? "column" : "column-reverse",
          gap: 5,
        }}
      >
        <Typography variant="h2" sx={{ fontSize: 48 }}>
          <MarkdownWrapper>{title}</MarkdownWrapper>
        </Typography>
        <CardMedia
          component={motion.div}
          whileInView={{ opacity: 1 }}
          sx={{
            position: "relative",
            width: {
              xs: truncate ? "100%" : "50%",
              lg: 600,
              xl: 720,
            },
            height: { xs: 115, lg: 400, xl: 420 },
            opacity: 0,
            "&:before": { content: '""', display: "block", pt: "56.25%" },
          }}
        >
          {image && title && (
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          )}
        </CardMedia>
      </Box>
      <Typography fontWeight={800}>
        <MarkdownWrapper>{epigraph}</MarkdownWrapper>
      </Typography>
      <Typography>
        <MarkdownWrapper>{paragraph}</MarkdownWrapper>
      </Typography>
      <Link href={`${btnUrl}`}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="arrow-right" size={20} />}
        >
          {btnLabel}
        </Button>
      </Link>
    </>
  );
};

export const NewCard = (props: NewsTabItem) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: 0,
        border: "none",
        pb: 5,
        px: { xs: 5, lg: 20 },
        pt: { xs: 30, lg: 0 },
        width: "100%",
        maxWidth: { lg: 800, xl: "100%" },
        height: "100%",
        justifyContent: { xs: "flex-start", lg: "center" },
      }}
    >
      <ContentPanel truncate={true} {...props} />
      <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            color: "text.secondary",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <ContentPanel {...props} truncate={false} />
        </Box>
      </CustomDialog>
    </Card>
  );
};
