"use client";
import { ReactNode, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, IconButton, styled, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

interface ParticipateDialogProps {
  buttonLabel: string;
  image: ReactNode;
  content: string;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 0,
    borderTopRightRadius: 160,
    margin: theme.spacing(6),
    overflow: "visible",
    maxWidth: 445,
  },
  "& p": {
    margin: 0,
    padding: 0,
    fontSize: 18,
    lineHeight: "120%",
    color: theme.palette.text.secondary,
  },
}));

export const ParticipateDialog = ({
  buttonLabel,
  content,
  image,
}: Partial<ParticipateDialogProps>) => {
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
    <Box>
      <Button
        variant="text"
        size="large"
        onClick={handleClickOpen}
        endIcon={<Icon icon="plus" size={40} />}
        sx={{
          mb: 5,
        }}
      >
        {buttonLabel}
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
          sx={{
            position: "relative",
            width: { xs: 160, lg: 250 },
            height: { xs: 160, lg: 250 },
            mx: 5,
          }}
        >
          {image}
        </Box>
        <DialogContent>
          <Box className="link-wrapper">
            <Typography>
              <MarkdownWrapper
                components={{
                  // eslint-disable-next-line
                  a: ({ node, ...props }) => {
                    const isInternal = props.href?.startsWith("#");

                    return (
                      <a
                        {...props}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noopener noreferrer"}
                        onClick={(e) => {
                          if (isInternal) {
                            e.preventDefault(); // Evitás el comportamiento por defecto
                            handleClose(); // Cerrás el modal

                            setTimeout(() => {
                              const el = document.querySelector(
                                `${props.href}`,
                              );
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }
                        }}
                      />
                    );
                  },
                }}
              >
                {content || ""}
              </MarkdownWrapper>
            </Typography>
          </Box>
        </DialogContent>
      </CustomDialog>
    </Box>
  );
};
