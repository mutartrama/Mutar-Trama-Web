import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import Icon from "../icon/Icon";

export const HomeSectionTitle = ({ children }: PropsWithChildren) => {
  return (
    <Typography
      sx={{
        color: "white",
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Icon icon="asterisk" size={40} color="inherit" />
      {children}
    </Typography>
  );
};
