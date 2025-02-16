import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Icon from "../icon/Icon";
import { useEffect, useRef, useState } from "react";

export const LegalsTitle = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const textRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pageContainer = document.querySelector(".page-container");
      if (pageContainer && textRef.current) {
        const topRef = pageContainer.getBoundingClientRect().top;
        console.log(topRef, isUpMd);
        const reference = isUpMd ? 110 : 170;
        if (topRef < reference) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, [isUpMd]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 70,
        borderBottom: `1px solid ${hasScrolled ? "#DFDFDF" : "transparent"}`,
        transition: "all 200ms",

        [theme.breakpoints.up("lg")]: {
          position: "fixed",
          top: 0,
          left: "120px",
          width: "64px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          borderBottom: "none",
        },
      }}
    >
      <Typography
        ref={textRef}
        sx={{
          bgcolor: "primary.main",
          fontSize: hasScrolled ? 24 : 32,
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: "#DFDFDF",
          px: 4,
          py: 1.5,
          height: 60,
          transition: "all 200ms",
          lineHeight: 1,
          transform: { lg: "rotate(-90deg)" },
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            width: hasScrolled ? 32 : 40,
            transition: "all 200ms",
          }}
        >
          <Icon
            icon="asterisk"
            size={hasScrolled ? 32 : 40}
            color="inherit"
            style={{ transition: "all 200ms" }}
          />
        </Box>
        Legales
      </Typography>
    </Box>
  );
};
