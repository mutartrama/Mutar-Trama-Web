import { useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { AnimatedTitleDesktop } from "./AnimatedTitleDesktop";
import { AnimatedTitleMobile } from "./AnimatedTitleMobile";

interface AnimatedTitleProps {
  backgroundColor: string;
  [x: string]: any;
}

export const AnimatedTitle = ({
  children,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  if (isLargeScreen) {
    return <AnimatedTitleDesktop {...props}>{children}</AnimatedTitleDesktop>;
  } else {
    return <AnimatedTitleMobile {...props}>{children}</AnimatedTitleMobile>;
  }
};
