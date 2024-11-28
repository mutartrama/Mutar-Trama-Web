import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useRef, useState } from "react";
import Icon from "../icon/Icon";

interface AnimatedTitleProps {
  backgroundColor: string;
  [x: string]: any;
}

export const AnimatedTitleDesktop = ({
  children,
  backgroundColor,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isPinned] = useState(false);

  return (
    <Typography
      ref={titleRef}
      data-cy="homeTitle"
      className="home-section-title"
      sx={{
        border: "1px solid red",

        color: "white",
        fontSize: isPinned ? 18 : 32,
        display: "flex",
        gap: 2,
        position: "sticky",
        zIndex: 5,
        bgcolor: backgroundColor,
        px: 4,
        py: 2,
        height: "100vh",
        width: "30px",
        transition: "all 100ms",
        marginLeft: "160px",
        top: 0,
      }}
      {...props}
    >
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          width: isPinned ? 0 : 40,
          transform: `scale(${isPinned ? 0 : 1})`,
          transition: "all 100ms",
        }}
      >
        <Icon icon="asterisk" size={40} color="inherit" />
      </Box>
      {children}
    </Typography>
  );
};
