import { Typography } from "@mui/material";
import { PropsWithChildren, useMemo } from "react";
import Icon from "../icon/Icon";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  defaultBackgroundColor: string;
  indexPosition: number;
  [x: string]: any;
}

export const AnimatedTitleMobile = ({
  children,
  indexPosition,
  defaultBackgroundColor,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const { lastPinnedIndex, backgroundColor } = useGlobalNavigationLayout();

  const isPinned = useMemo(
    () => indexPosition < lastPinnedIndex,
    [indexPosition, lastPinnedIndex],
  );
  const isAtBottom = useMemo(() => lastPinnedIndex === 4, [lastPinnedIndex]);

  // console.log(isPinned, isAtBottom)
  const bgColor =
    indexPosition < lastPinnedIndex && backgroundColor
      ? backgroundColor
      : defaultBackgroundColor;
  const fgColor = bgColor === "#DFDFDF" ? "#1F1F1F" : "#DFDFDF";

  return (
    <Typography
      data-cy="homeTitle"
      className="home-section-title"
      sx={{
        // fontSize: isPinned ? 18 : 32,
        display: "flex",
        alignItems: "center",
        gap: 2,
        position: "sticky",
        bgcolor: bgColor,
        color: fgColor,
        px: 4,
        py: 0,
        height: 42,
        transition: "all 900ms",
        overflowY: "hidden",
      }}
      {...props}
    >
      <motion.span
        key={`${indexPosition}-asterik`}
        style={{
          display: "flex",
          alignItems: "center",
          // width: isAtBottom ? 18 : 40,
          width: 40,
        }}
        animate={{
          scale: isAtBottom ? 0.6 : isPinned ? 0 : 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: isAtBottom ? indexPosition * 0.1 : 0,
        }}
      >
        <Icon icon="asterisk" size={40} color="inherit" />
      </motion.span>

      <motion.span
        key={`${indexPosition}-title-menu`}
        style={{ transformOrigin: "left", fontSize: "32px", lineHeight: 1 }}
        initial={{ scale: 1 }}
        animate={{
          scale: isPinned ? 0.5625 : 1,
          x: isPinned && !isAtBottom ? -40 : isAtBottom ? -8 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: isAtBottom ? indexPosition * 0.1 : 0,
        }}
      >
        {children}
      </motion.span>
    </Typography>
  );
};
