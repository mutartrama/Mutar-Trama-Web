"use client";

import Icon from "@/components/icon/Icon";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface NewsletterFieldProps {
  isSubmited: boolean;
  onSubmit: (email: string) => void;
}

export const NewsletterField = ({
  isSubmited,
  onSubmit,
}: NewsletterFieldProps) => {
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

  return (
    <>
      {isSubmited ? (
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
      ) : (
        <FormControl>
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
          </Stack>
          <FormHelperText sx={{ color: "text.primary", ml: 0 }}>
            {error ? "El email no tiene un formato válido." : " "}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
};
