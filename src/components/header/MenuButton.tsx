"use client";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import Icon from "../icon/Icon";

export const MenuButton = () => {
  const t = useTranslations("HomePage");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <IconButton>
      <Icon icon="menu" size={isLargeScreen ? 50 : 40} />
    </IconButton>
  );
};
