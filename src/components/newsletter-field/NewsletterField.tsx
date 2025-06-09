"use client";

import Icon from "@/components/icon/Icon";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";

interface NewsletterFieldProps {
  status: "loading" | "success" | "error" | null;
  onSubmit: (email: string) => void;
}

export const NewsletterField = ({ status, onSubmit }: NewsletterFieldProps) => {
  const t = useTranslations("Footer");

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(value)) {
      setError(true);
    } else {
      setError(false);
      onSubmit(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(false);
  };

  const isSubmited = status === "success";
  const isLoading = status === "loading";
  const isFailed = status === "error";

  return (
    <>
      {isSubmited ? (
        <Box sx={{ height: 56 }}>
          <Stack
            sx={{
              bgcolor: "secondary.main",
              width: 220,
              height: 32,
              justifyContent: "center",
              p: 1,
            }}
          >
            Suscriptx!
          </Stack>
        </Box>
      ) : (
        <FormControl sx={{ height: 56 }}>
          <Stack
            direction="row"
            sx={{
              bgcolor: "background.default",
              width: 220,
              height: 32,
              border: `1px solid ${error ? "#CD7575" : "#DFDFDF"}`,
              "&:hover": {
                bgcolor: "altColors.secondaryBackgound",
              },
            }}
          >
            <InputBase
              placeholder={"Placeholder"}
              onChange={handleChange}
              value={value}
              sx={{
                color: "text.primary",
                px: 2,
              }}
            />
            {isLoading ? (
              <Box
                sx={{
                  width: 36,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="secondary" size="16px" />
              </Box>
            ) : (
              <IconButton
                onClick={handleSubmit}
                disabled={!value}
                sx={{
                  color: "text.secondary",
                  bgcolor: "background.paper",
                  borderRadius: 0,
                  padding: 1,
                  "&.Mui-disabled": {
                    bgcolor: "background.paper",
                    color: "text.secondary",
                  },
                  "&:hover, &:focus, &:active": {
                    bgcolor: "background.paper",
                  },
                }}
              >
                <Icon
                  icon="send"
                  size={24}
                  style={{ opacity: value ? 1 : 0.5 }}
                />
              </IconButton>
            )}
          </Stack>
          <FormHelperText sx={{ color: "text.primary", ml: 0 }}>
            {error
              ? t("newsletterEmailError")
              : isFailed
                ? t("newsletterNetworkError")
                : " "}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
};
