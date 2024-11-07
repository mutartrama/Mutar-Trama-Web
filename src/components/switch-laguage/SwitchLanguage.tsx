"use client";
import Icon from "../icon/Icon";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { Link } from "@/i18n/routing";

export const SwitchLanguageButton = () => {
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitch");

  const handleLanguageSwitch = () => {
    // Forzar recarga después de cambiar el idioma
    setTimeout(() => {
      window.location.href = `/${t("to")}`;
    }, 100); // Un pequeño retraso para permitir que Next.js cambie el idioma
  };

  return (
    <Link
      href={"/"}
      locale={t("to")}
      style={{ width: "fit-content" }}
      onClick={handleLanguageSwitch}
    >
      <Button variant="text" startIcon={<Icon icon="arrow-right" size={20} />}>
        {t("link")}
      </Button>
    </Link>
  );
};
