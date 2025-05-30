"use client";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { useEffect, useState, useTransition } from "react";
import Icon from "../icon/Icon";
import { usePathname, useRouter } from "@/i18n/routing";

interface MenuButtonProps {
  fill?: string;
}

export const MenuButton = ({ fill }: MenuButtonProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { isMenuOpen, toggleMenuOpen } = useGlobalNavigationLayout();
  const [currentFill, setCurrentFill] = useState("#1F1F1F");
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();

  const btnSize = isLargeScreen ? 50 : 40;

  useEffect(() => {
    if (fill) setCurrentFill(fill);
  }, [fill]);

  const onClickMenuButton = () => {
    if (pathname !== "/") {
      startTransition(() => {
        router.replace("/?scrollTo=footer");
      });
      return;
    }

    const scrollingElement = document.scrollingElement || document.body;
    window.scrollTo({
      top: isMenuOpen ? 0 : scrollingElement.scrollHeight,
      behavior: "smooth",
    });

    toggleMenuOpen();
  };

  return (
    <IconButton onClick={onClickMenuButton} disabled={isPending}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: btnSize,
          height: btnSize,
        }}
      >
        <Icon
          color={currentFill}
          icon="menu"
          size={btnSize}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${isMenuOpen ? 0 : 1})`,
            transition: "transform 100ms",
          }}
        />
        <Icon
          color={currentFill}
          icon="close"
          size={btnSize}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${isMenuOpen ? 1 : 0})`,
            transition: "transform 100ms",
          }}
        />
      </Box>
    </IconButton>
  );
};
