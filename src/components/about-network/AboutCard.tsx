import { AboutTabItem } from "@/app/api/responses";
import { Link } from "@/i18n/routing";
import { truncateText } from "@/lib/truncateText";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { CustomDialog } from "../custom-dialog/CustomDialog";
import { useState } from "react";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

const ContentPanel = ({
  title,
  image,
  paragraph,
  tags,
  truncate,
  setOpen,
}: Partial<AboutTabItem> & { truncate: boolean; setOpen?: () => void }) => {
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        flex: { xs: 1, lg: "unset" },
        color: "inherit",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: truncate ? "column" : "column-reverse",
          gap: 5,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "inherit",
          }}
        >
          <MarkdownWrapper>{title}</MarkdownWrapper>
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: truncate ? "100%" : "40%",
            maxWidth: 680,
            height: isUpLg ? 300 : truncate ? 144 : 94,
          }}
        >
          {image && title && (
            <Box
              component={Image}
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              sx={{
                overflow: "hidden",
              }}
            />
          )}
        </Box>
      </Box>
      <Box>{tags?.map((tag) => <Typography key={tag}>{tag}</Typography>)}</Box>
      <Typography sx={{ height: { lg: 200 } }}>
        <MarkdownWrapper>
          {truncate && !isUpLg ? truncateText(paragraph || "", 340) : paragraph}
        </MarkdownWrapper>
        &nbsp;
        {truncate && !isUpLg && (
          <Button sx={{ color: "#CD7575" }} onClick={setOpen}>
            Leer más
          </Button>
        )}
      </Typography>
    </Box>
  );
};

export const AboutCard = ({
  title,
  image,
  paragraph,
  tags,
  btnLabel,
  btnUrl,
}: Partial<AboutTabItem>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { lg: "center" },
        flexDirection: "column",
        gap: 5,
        width: "100vw",
        height: "100vh",
        px: 5,
        pb: 10,
        pt: {
          xs: (70 + 48 * 2) / 4 + 5,
          lg: 0,
        },
      }}
    >
      <ContentPanel
        {...{ title, image, paragraph, tags }}
        truncate={true}
        setOpen={() => setIsOpen(true)}
      />

      <Box>
        <Button
          color="secondary"
          variant="contained"
          LinkComponent={Link}
          href={`${btnUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {btnLabel}
        </Button>
      </Box>

      <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ color: "text.secondary" }}>
          <ContentPanel
            {...{ title, image, paragraph, tags }}
            truncate={false}
          />
        </Box>
      </CustomDialog>
    </Box>
  );
};
