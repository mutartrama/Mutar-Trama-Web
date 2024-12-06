import { Card, CardMedia, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { Link } from "@/i18n/routing";
import Icon from "../icon/Icon";

export const ProjectCard = ({ blok }: any) => {
  return (
    <Card
      data-cy="projectsCard"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: 0,
        border: "none",
        pb: 5,
        px: 5,
        color: "text.secondary",
        maxWidth: 464,
      }}
      {...storyblokEditable(blok)}
    >
      <CardMedia
        sx={{
          position: "relative",
          width: "100%",
          "&:before": { content: '""', display: "block", pt: "100%" },
        }}
      >
        <Image src={blok.image.filename} alt={blok.image.alt} fill></Image>
      </CardMedia>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 62, lg: 72 },
          lineHeight: 1,
        }}
      >
        {blok.title}
      </Typography>
      <Typography sx={{ opacity: 0.5 }}>{blok.subtitle}</Typography>
      <Link href={blok.buttonLink}>
        <IconButton>
          <Icon icon="diagonal-arrow" size={50} />
        </IconButton>
      </Link>
    </Card>
  );
};
