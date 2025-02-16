import { Box, Stack, Typography } from "@mui/material";
import { RoseDeco } from "./rose-deco";
import { SproutDeco } from "./sprout-deco";

interface ErrorMessageProps {
  deco: "rose" | "sprout";
  title: string;
  description: string;
}

const decos = {
  rose: <RoseDeco />,
  sprout: <SproutDeco />,
};

export const ErrorMessage = ({
  deco,
  title,
  description,
}: ErrorMessageProps) => {
  return (
    <Stack sx={{ alignItems: "center", p: 5 }}>
      <Box>{decos[deco]}</Box>
      <Typography
        variant="h1"
        component="h4"
        sx={{
          fontSize: 56,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 22,
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};
