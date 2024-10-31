"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
  },
});

export default theme;
