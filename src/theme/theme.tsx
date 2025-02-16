"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },
  },
  typography: {
    fontFamily: "var(--font-telegraf-400)",
    h1: {
      fontFamily: "var(--font-viaoda-libre)", // Fuente para h1
    },
    h2: {
      fontFamily: "var(--font-viaoda-libre)", // Fuente para h2
    },
  },
  palette: {
    primary: {
      main: "#6856D9",
    },
    secondary: {
      main: "#CD7575",
    },
    background: {
      default: "#1F1F1F",
      paper: "#DFDFDF",
    },
    text: {
      primary: "#EAEAEA",
      secondary: "#1F1F1F",
    },
    altColors: {
      background: "rgb(104, 86, 217)",
      secondaryBackgound: "#0D0D0D",
    },
  },
  spacing: (factor: number) => `${factor * 0.25}rem`,
  // Compos
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#CD7575",
          fontFamily: "var(--font-telegraf-800)",
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 0,
          fontSize: 16,
        },
        text: {
          backgroundColor: "transparent",
          padding: 0,
        },
        containedPrimary: {
          color: "rgb(223, 223, 223)",
          backgroundColor: "rgb(31, 31, 31)",
          fontSize: 18,
          padding: "10px 20px",
          lineHeight: 1.1,
          "&:hover": {
            color: "rgb(234, 234, 234)",
            backgroundColor: "rgb(205, 117, 117)",
          },
          "&:disabled": {
            color: "rgba(223, 223, 223, 0.3)",
            backgroundColor: "rgb(31, 31, 31)",
          },
        },
        containedSecondary: {
          color: "rgb(31, 31, 31)",
          backgroundColor: "rgb(223, 223, 223)",
          fontSize: 18,
          padding: "10px 20px",
          lineHeight: 1.1,
          "&:hover": {
            backgroundColor: "rgb(205, 117, 117)",
            color: "rgb(13, 13, 13)",
          },
          "&:disabled": {
            backgroundColor: "rgb(223, 223, 223)",
            color: "rgba(31, 31, 31, 0.3)",
          },
        },
        textPrimary: {
          color: "rgb(31, 31, 31)",
          "&:hover": {
            color: "rgb(205, 117, 117)",
          },
          "&:disabled": {
            color: "rgba(31, 31, 31, 0.3)",
          },
        },
        textSecondary: {
          color: "rgb(223, 223, 223)",
          "&:hover": {
            color: "rgb(205, 117, 117)",
          },
          "&:disabled": {
            color: "rgba(223, 223, 223, 0.3)",
          },
        },
        sizeLarge: {
          padding: 0,
          lineHeight: 1,
          fontSize: "42px",
          color: "rgb(223, 223, 223)",
          "&:hover": {
            color: "rgb(205, 117, 117)",
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        colorPrimary: {
          backgroundColor: "rgb(31, 31, 31)",
          color: "rgb(223, 223, 223)",
          "&:hover, &:focus": {
            backgroundColor: "rgb(205, 117, 117)",
            color: "rgb(223, 223, 223)",
            "&:hover svg": {
              fill: `rgb(205, 117, 117) !important`,
            },
          },
          "&:disabled": {
            backgroundColor: "rgb(31, 31, 31)",
            color: "rgba(223, 223, 223, 0.3)",
          },
        },
        colorSecondary: {
          backgroundColor: "rgb(223, 223, 223)",
          color: "rgb(31, 31, 31)",
          "&:hover": {
            backgroundColor: "rgb(205, 117, 117)",
            color: "rgb(223, 223, 223)",
          },
          "&:disabled": {
            backgroundColor: "rgb(223, 223, 223)",
            color: "rgba(31, 31, 31, 0.3)",
          },
        },
        sizeLarge: {
          "&.MuiIconButton-colorPrimary": {
            color: "rgb(31, 31, 31)",
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorPrimary:hover": {
            color: "rgb(205, 117, 117)",
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorPrimary.Mui-disabled": {
            color: "rgba(31, 31, 31, 0.3)",
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorSecondary": {
            color: "rgb(223, 223, 223)",
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorSecondary:hover": {
            color: "rgb(223, 223, 223)",
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorSecondary.Mui-disabled": {
            color: "rgba(223, 223, 223, 0.3)",
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
