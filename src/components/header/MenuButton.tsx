"use client";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Icon from "../icon/Icon";
import { Link } from "@/i18n/routing";

interface MenuButtonProps {
  fill?: string;
}

export const MenuButton = ({ fill = "#1F1F1F" }: MenuButtonProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <IconButton sx={{ color: fill }} LinkComponent={Link} href="/#footer-menu">
      <Icon icon="menu" size={isLargeScreen ? 50 : 40} />
    </IconButton>
  );
};
