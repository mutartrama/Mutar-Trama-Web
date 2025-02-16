"use client";
import { useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { storyblokEditable } from "@storyblok/react/rsc";
import { Box, IconButton, styled } from "@mui/material";
import Image from "next/image";
import { richTextResolver } from "@storyblok/richtext";
import Icon from "../icon/Icon";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 0,
    borderTopRightRadius: 160,
    margin: theme.spacing(6),
    overflow: "visible",
  },
}));

export const ParticipateDialog = ({ blok }: any) => {
  const { render } = richTextResolver();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        const dialogPaper = document.querySelector(".MuiDialog-paper");
        console.log(dialogPaper);
      }, 500);
    }
  }, [open]);

  return (
    <Box {...storyblokEditable(blok)}>
      <Button
        variant="text"
        size="large"
        onClick={handleClickOpen}
        endIcon={<Icon icon="plus" size={40} />}
        sx={{
          mb: 5,
        }}
      >
        {blok.buttonLabel}
      </Button>
      <CustomDialog open={open} onClose={handleClose}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            p: 0,
            color: "text.primary",
            "&:hover": {
              color: "secondary.main",
            },
          }}
        >
          <Icon icon="close" size={40} />
        </IconButton>
        <Box
          sx={{ position: "relative", width: 160, height: 160, minHeight: 160 }}
        >
          <Image src={blok.image.filename} alt={blok.image.alt} fill></Image>
        </Box>
        <DialogContent>
          <Box
            className="link-wrapper"
            sx={{
              color: "text.secondary",
              fontSize: 18,
            }}
            dangerouslySetInnerHTML={{
              __html: render(blok.content) as TrustedHTML,
            }}
          />
        </DialogContent>
      </CustomDialog>
    </Box>
  );
};
