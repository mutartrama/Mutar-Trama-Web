import { Box, Stack } from "@mui/material";
import { FlowerLogo } from "./FlowerLogo";
import { MutarTramaLogo } from "./MutarTramaLogo";
import { MenuButton } from "./MenuButton";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";

export const Header = () => {
  return (
    <Stack
      direction={{ xs: "row", lg: "column" }}
      sx={{
        height: { xs: 70, lg: "100vh" },
        position: "fixed",
        px: 5,
        top: 0,
        left: 0,
        width: { xs: "100vw", lg: 120, xl: 160 },
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        py: { lg: 5 },
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <FlowerLogo />
      </Box>
      <Stack sx={{ display: { lg: "none", mixBlendMode: "darken" } }}>
        <MutarTramaLogo />
      </Stack>
      <Box>
        <MenuButton />
      </Box>

      <Stack
        justifyContent="center"
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <SwitchLanguageButton />
      </Stack>
    </Stack>
  );
};
