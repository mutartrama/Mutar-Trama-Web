import { useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { AnimatedTitleMobile } from "./AnimatedTitleMobile";
import { AnimatedTitleDesktopV2 } from "./AnimatedTitleDesktopV2";

interface AnimatedTitleProps {
  backgroundColor: string;
  indexPosition: string | number;
  [x: string]: any;
}

export const AnimatedTitle = ({
  children,
  indexPosition,
  backgroundColor,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  if (isLargeScreen) {
    return (
      <AnimatedTitleDesktopV2
        defaultBackgroundColor={backgroundColor}
        indexPosition={Number(indexPosition)}
        {...props}
      >
        {children}
      </AnimatedTitleDesktopV2>
    );
  } else {
    return (
      <AnimatedTitleMobile
        defaultBackgroundColor={backgroundColor}
        indexPosition={Number(indexPosition)}
        {...props}
      >
        {children}
      </AnimatedTitleMobile>
    );
  }
};
