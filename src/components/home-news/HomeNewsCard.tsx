import { Link } from "@/i18n/routing";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Icon from "../icon/Icon";

export const HomeNewsCard = ({ blok }: any) => {
  return (
    <Card
      data-cy="homeNewsCard"
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
      <CardMedia sx={{ position: "relative", height: 230 }}>
        <Image src={blok.image.filename} alt={blok.image.alt} fill></Image>
      </CardMedia>
      <Typography fontFamily="var(--font-telegraf-800)">
        {blok.epigraph}
      </Typography>
      <Typography>{blok.description}</Typography>
      <Link href={blok.buttonLink}>
        <Button
          variant="contained"
          startIcon={<Icon icon="arrow-right" size={20} />}
        >
          {blok.buttonLabel}
        </Button>
      </Link>
    </Card>
  );
};
