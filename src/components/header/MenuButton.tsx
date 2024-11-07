"use client";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Icon from "../icon/Icon";

export const MenuButton = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <IconButton>
      <Icon icon="menu" size={isLargeScreen ? 50 : 40} />
    </IconButton>
  );
};
