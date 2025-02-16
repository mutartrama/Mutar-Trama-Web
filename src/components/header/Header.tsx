import { Box, Stack } from "@mui/material";
import { FlowerLogo } from "./FlowerLogo";
import { MutarTramaLogo } from "./MutarTramaLogo";
import { MenuButton } from "./MenuButton";
import { SwitchLanguageButton } from "../switch-laguage/SwitchLanguage";
import { Link } from "@/i18n/routing";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { useEffect } from "react";
import { animate } from "motion";

interface HeaderProps {
  id?: string;
  bgcolor?: string;
  fill?: string;
}

export const Header = ({ bgcolor, id, fill = "#1f1f1f" }: HeaderProps) => {
  const { backgroundColor, isLoaded } = useGlobalNavigationLayout();

  useEffect(() => {
    if (isLoaded) {
      animate("#header-flower-logo", { opacity: 1, animationDuration: 1 });
      animate("#header-menu-button", {
        opacity: 1,
        animationDuration: 1,
        animationDelay: 0.25,
      });
      animate("#header-switch-lang", {
        opacity: 1,
        animationDuration: 1,
        animationDelay: 0.5,
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    const mainHeader = document.getElementById("main-header") as HTMLDivElement;
    const switchLanguage = document.getElementById(
      "switch-language",
    ) as HTMLDivElement;

    if (mainHeader) {
      mainHeader.style.backgroundColor = backgroundColor || "#DFDFDF";

      const svgs = mainHeader.querySelectorAll("svg");

      svgs.forEach((svg: SVGElement) => {
        if (
          backgroundColor === "#1F1F1F" ||
          backgroundColor === "#6856D9" ||
          backgroundColor === "#000000"
        ) {
          svg.style.fill = "#DFDFDF";
          switchLanguage.style.color = "#DFDFDF";
        } else {
          svg.style.fill = "#1F1F1F";
          switchLanguage.style.color = "#1F1F1F";
        }
      });
    }
  }, [backgroundColor]);

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
        transition: "all 900ms",
      }}
    >
      <Link id="header-flower-logo" href="/" style={{ opacity: 0 }}>
        <Box sx={{ fill: fill }}>
          <FlowerLogo />
        </Box>
      </Link>
      <Stack sx={{ display: { lg: "none", mixBlendMode: "darken" } }}>
        <MutarTramaLogo />
      </Stack>
      <Box id="header-menu-button" sx={{ opacity: 0 }}>
        <MenuButton fill={fill} />
      </Box>

      <Stack
        id="header-switch-lang"
        justifyContent="center"
        sx={{ display: { xs: "none", lg: "flex", opacity: 0 } }}
      >
        <SwitchLanguageButton fill={fill} />
      </Stack>
    </Stack>
  );
};
