import { Dialog, DialogContent, IconButton, styled } from "@mui/material";
import Icon from "../icon/Icon";
import { ReactNode } from "react";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
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

export const CustomDialog = ({
  children,
  isOpen,
  onClose,
}: CustomDialogProps) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <IconButton
        onClick={onClose}
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

      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
};
