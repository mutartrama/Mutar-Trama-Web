import { Box, Stack } from "@mui/material";
import { FlowerLogo } from "./FlowerLogo";
import { MutarTramaLogo } from "./MutarTramaLogo";
import { MenuButton } from "./MenuButton";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { Link } from "@/i18n/routing";

interface HeaderProps {
  activeIndex?: number | null;
  id?: string;
  bgcolor?: string;
  fill?: string;
  reachedEnd: boolean;
}

const backgroundColors = [
  "#DFDFDF",
  "#6856D9",
  "#1F1F1F",
  "#DFDFDF",
  "#1F1F1F",
  "#0D0D0D",
];
const foregroundColors = [
  "#1F1F1F",
  "#DFDFDF",
  "#DFDFDF",
  "#1F1F1F",
  "#DFDFDF",
  "#DFDFDF",
];

export const Header = ({
  id,
  activeIndex,
  reachedEnd,
  bgcolor,
  fill,
}: HeaderProps) => {
  const lastIndex = backgroundColors.length - 1;

  const backgroundColor = bgcolor
    ? bgcolor
    : reachedEnd
      ? backgroundColors[lastIndex]
      : backgroundColors[
          typeof activeIndex === "number" ? Math.min(activeIndex, lastIndex) : 0
        ];

  const foregroundColor = fill
    ? fill
    : reachedEnd
      ? foregroundColors[lastIndex]
      : foregroundColors[
          typeof activeIndex === "number" ? Math.min(activeIndex, lastIndex) : 0
        ];

  return (
    <Box
      key="main-header"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        id={id}
        direction={{ xs: "row", lg: "column" }}
        sx={{
          height: { xs: 70, lg: "100vh" },
          backgroundColor: backgroundColor,
          color: foregroundColor,
          transition: "all 0.2s ease-in-out",
          position: "fixed",
          px: 5,
          top: 0,
          left: 0,
          width: { xs: "100vw", lg: 120 },
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          py: { lg: 5 },
        }}
      >
        <Link id="header-flower-logo" href="/">
          <Box sx={{ fill: foregroundColor }}>
            <FlowerLogo />
          </Box>
        </Link>
        <Stack sx={{ display: { lg: "none", mixBlendMode: "darken" } }}>
          <MutarTramaLogo />
        </Stack>
        <Box id="header-menu-button">
          <MenuButton fill={foregroundColor} />
        </Box>

        <Stack
          id="header-switch-lang"
          justifyContent="center"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <SwitchLanguageButton fill={foregroundColor} />
        </Stack>
      </Stack>
    </Box>
  );
};
