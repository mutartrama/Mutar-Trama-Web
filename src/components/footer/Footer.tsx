import { Box, Typography } from "@mui/material";
import { storyblokEditable } from "@storyblok/react/rsc";

export const Footer = ({ blok }: any) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 5,
        pl: { lg: "calc(120px + 1rem)", xl: "calc(160px + 1rem)" },
      }}
      data-cy="footer"
      {...storyblokEditable(blok)}
    >
      <Typography>
        <strong>Mutar Trama.</strong>
      </Typography>
      <Typography>
        Desde argentina, <br />
        con el mundo.
      </Typography>
    </Box>
  );
};
