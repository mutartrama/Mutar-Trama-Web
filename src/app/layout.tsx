import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";

const viaodaLibre = localFont({
  src: "./fonts/ViaodaLibre-400.ttf",
  variable: "--font-viaoda-libre",
  weight: "400",
});

const telegraf200 = localFont({
  src: "./fonts/Telegraf-200.otf",
  variable: "--font-telegraf-200",
  weight: "200",
});

const telegraf400 = localFont({
  src: "./fonts/Telegraf-400.otf",
  variable: "--font-telegraf-400",
  weight: "400",
});

const telegraf800 = localFont({
  src: "./fonts/Telegraf-800.otf",
  variable: "--font-telegraf-800",
  weight: "800",
});

export const metadata: Metadata = {
  title: "Mutar Trama",
  description: "Espacio colaborativo de artistas de diversos campos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${viaodaLibre.variable} ${telegraf200.variable}  ${telegraf400.variable}  ${telegraf800.variable}`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
