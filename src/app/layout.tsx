import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Box } from "@mui/material";
import { StoryblokProvider } from "@/components/storyblok-provider/StoryblokProvider";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params; // params should be awaited before using its properties.

  if (!routing.locales.includes(locale as any)) {
    // notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${viaodaLibre.variable} ${telegraf200.variable}  ${telegraf400.variable}  ${telegraf800.variable}`}
      >
        {/* <StoryblokProvider> */}
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        {/* </StoryblokProvider> */}
      </body>
    </html>
  );
}
