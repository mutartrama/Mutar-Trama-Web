"use client";
import Icon from "../icon/Icon";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { Link } from "@/i18n/routing";

interface SwitchLanguageButtonProps {
  fill?: string;
}

export const SwitchLanguageButton = ({
  fill = "text.secondary",
}: SwitchLanguageButtonProps) => {
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
      className="switch-lang"
    >
      <Button
        id="switch-language"
        variant="text"
        startIcon={<Icon icon="arrow-right" size={20} />}
        sx={{
          color: fill,
        }}
      >
        {t("link")}
      </Button>
    </Link>
  );
};
