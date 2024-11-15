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
      }}
      {...storyblokEditable(blok)}
    >
      <Typography variant="h2">{blok.title}</Typography>
      <Typography>{blok.subtitle}</Typography>
      <CardMedia sx={{ position: "relative", height: 230 }}>
        <Image src={blok.image.filename} alt={blok.image.alt} fill></Image>
      </CardMedia>
      <Link href={blok.buttonLink}>
        <IconButton>
          <Icon icon="diagonal-arrow" size={50} />
        </IconButton>
      </Link>
    </Card>
  );
};
