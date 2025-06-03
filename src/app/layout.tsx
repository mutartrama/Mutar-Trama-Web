import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { GlobalNavigationLayoutProvider } from "@/contexts/global-navigation-layout";
import "./global.css";

interface LayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const viaodaLibre = localFont({
  src: "../fonts/ViaodaLibre-400.ttf",
  variable: "--font-viaoda-libre",
  weight: "400",
});

const telegraf200 = localFont({
  src: "../fonts/Telegraf-200.otf",
  variable: "--font-telegraf-200",
  weight: "200",
});

const telegraf400 = localFont({
  src: "../fonts/Telegraf-400.otf",
  variable: "--font-telegraf-400",
  weight: "400",
});

const telegraf800 = localFont({
  src: "../fonts/Telegraf-800.otf",
  variable: "--font-telegraf-800",
  weight: "800",
});

export const metadata: Metadata = {
  title: "Mutar Trama",
  description: "Espacio colaborativo de artistas",
};

export const viewport: Viewport = {
  height: "device-height",
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
};

// content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, target-densitydpi=device-dpi"

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    // notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${viaodaLibre.variable} ${telegraf200.variable}  ${telegraf400.variable}  ${telegraf800.variable}`}
    >
      <body>
        <GlobalNavigationLayoutProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </GlobalNavigationLayoutProvider>
      </body>
    </html>
  );
}
