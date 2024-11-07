"use client";
import Lottie from "lottie-react";
import * as animationData from "./flower-head-person-data.json";
import { Stack, useMediaQuery, useTheme } from "@mui/material";

export const FlowerHeadPerson = () => {
  const clonedAnimationData = JSON.parse(JSON.stringify(animationData));
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Stack
      sx={{
        maxHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: { lg: "absolute" },
        right: { lg: -100, xl: 0 },
        top: 0,
      }}
    >
      <Lottie
        animationData={clonedAnimationData}
        loop={true}
        style={{
          height: isLargeScreen ? "106vh" : 400,
          width: isLargeScreen ? "50vw" : "auto",
          paddingBottom: isLargeScreen ? 44 : 0,
        }}
      />
    </Stack>
  );
};
