import { Box, Stack } from "@mui/material";
import { FlowerLogo } from "./FlowerLogo";
import { MutarTramaLogo } from "./MutarTramaLogo";
import { MenuButton } from "./MenuButton";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";

interface HeaderProps {
  id?: string;
  bgcolor?: string;
  fill?: string;
}

export const Header = ({ bgcolor, id, fill = "#1f1f1f" }: HeaderProps) => {
  console.log(bgcolor);

  return (
    <Stack
      id={id}
      direction={{ xs: "row", lg: "column" }}
      sx={{
        height: { xs: 70, lg: "100vh" },
        position: "fixed",
        px: 5,
        top: 0,
        left: 0,
        width: { xs: "100vw", lg: 120 },
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        py: { lg: 5 },
        bgcolor: bgcolor,
      }}
    >
      <Box sx={{ fill: fill }}>
        <FlowerLogo />
      </Box>
      <Stack sx={{ display: { lg: "none", mixBlendMode: "darken" } }}>
        <MutarTramaLogo />
      </Stack>
      <Box>
        <MenuButton fill={fill} />
      </Box>

      <Stack
        justifyContent="center"
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <SwitchLanguageButton fill={fill} />
      </Stack>
    </Stack>
  );
};
