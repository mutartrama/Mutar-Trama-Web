"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren, memo } from "react";
import Icon from "../icon/Icon";
import { Link } from "@/i18n/routing";

const backgroundColors = [
  "#6856D9",
  "#1F1F1F",
  "#DFDFDF",
  "#1F1F1F",
  "#0D0D0D",
];
const foregroundColors = [
  "#DFDFDF",
  "#DFDFDF",
  "#1F1F1F",
  "#DFDFDF",
  "#DFDFDF",
];

interface MenuItemMobileProps {
  index: number;
  reachedEnd: boolean;
  href: string;
  activeIndex?: number | null;
  [x: string]: any;
}

const MenuItemMobileComponent = ({
  children,
  index,
  activeIndex,
  reachedEnd,
  href,
  ...props
}: PropsWithChildren<MenuItemMobileProps>) => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const calculatedIndex = index - 1;
  const stickyTop = isUpMd ? 0 : 70 + 48 * calculatedIndex;
  const isSticky = typeof activeIndex === "number" && activeIndex >= index;

  const lastIndex = backgroundColors.length - 1;

  const getSafeIndex = (i: number) => Math.min(Math.max(i, 0), lastIndex); // asegura que el índice esté en rango

  const backgroundColor = reachedEnd
    ? backgroundColors[lastIndex]
    : isSticky && activeIndex != null
      ? backgroundColors[getSafeIndex(activeIndex - 1)]
      : backgroundColors[getSafeIndex(calculatedIndex)];

  const foregroundColor = reachedEnd
    ? foregroundColors[lastIndex]
    : isSticky && activeIndex != null
      ? foregroundColors[getSafeIndex(activeIndex - 1)]
      : foregroundColors[getSafeIndex(calculatedIndex)];

  return (
    <Box
      component={Link}
      href={href}
      data-sticky-index={index}
      sx={{
        position: "sticky",
        top: { xs: `${stickyTop}px`, md: 0 },
        zIndex: 2,
        backgroundColor,
        color: foregroundColor,
        transition: "all 0.2s ease-in-out",
        height: { xs: 48, md: 0 },
        left: { md: calculatedIndex * 66 + 120 },
        width: { md: 66 },
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
      {...props}
    >
      <Box
        sx={{
          [theme.breakpoints.up("lg")]: {
            transform: "translateY(50%)",
            width: "66px",
            height: "100vh",
            backgroundColor,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            transformOrigin: "center left",
            transform: {
              xs: isSticky ? "scale(0.55)" : "scale(1)",
              md: "rotate(-90deg) translateY(calc(50% + 12px))",
            },
            transition: "all 0.2s ease-out",
            gap: reachedEnd ? 3 : 2,
            fontSize: 28,
            transitionDelay: reachedEnd ? `${index * 0.15}s` : 0,
            textWrap: "nowrap",
          }}
        >
          <Box
            component={Icon}
            icon="asterisk"
            size={40}
            color="inherit"
            sx={{
              transform: reachedEnd ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.2s ease-out",
              transitionDelay: `${index * 0.15}s`,
            }}
          />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

MenuItemMobileComponent.displayName = "MenuItemMobile";

export const MenuItemMobile = memo(
  MenuItemMobileComponent,
  (prevProps, nextProps) =>
    prevProps.index === nextProps.index &&
    prevProps.activeIndex === nextProps.activeIndex &&
    prevProps.reachedEnd === nextProps.reachedEnd,
);
