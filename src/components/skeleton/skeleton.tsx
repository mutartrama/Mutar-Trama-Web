import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonContent = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      bgcolor: "background.default",
      p: 4,
      display: "flex",
      flexDirection: "column",

      gap: 2,
    }}
  >
    <Skeleton width="100%" height={60} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={60} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={60} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={260} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="100%" height={18} sx={{ transform: "none" }} />
    <Skeleton width="40%" height={38} sx={{ transform: "none", mt: 4 }} />
  </Box>
);
