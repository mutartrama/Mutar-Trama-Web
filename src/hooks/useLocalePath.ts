"use client";
import { useEffect, useState } from "react";

export const useLocalePath = () => {
  const [locale, setLocale] = useState(
    window.location.pathname.search("es") > 0 ? "es" : "en",
  );

  useEffect(() => {
    const currentLocale =
      window.location.pathname.search("es") > 0 ? "es" : "en";
    setLocale(currentLocale);
  }, []);

  return locale;
};
