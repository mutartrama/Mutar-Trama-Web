import { useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { AnimatedTitleMobile } from "./AnimatedTitleMobile";
import { AnimatedTitleDesktopV2 } from "./AnimatedTitleDesktopV2";

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
    return (
      <AnimatedTitleDesktopV2 {...props}>{children}</AnimatedTitleDesktopV2>
    );
  } else {
    return <AnimatedTitleMobile {...props}>{children}</AnimatedTitleMobile>;
  }
};
