import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Icon from "../icon/Icon";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export const LegalsTitle = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const textRef = useRef<HTMLDivElement>(null);
  const isUpMdRef = useRef(isUpMd);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Actualizá el ref si cambia el breakpoint
  useEffect(() => {
    isUpMdRef.current = isUpMd;
  }, [isUpMd]);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const topRef = document.body.getBoundingClientRect().top;

        setHasScrolled(topRef === 0 ? false : true);
      }
    };

    // Llamar una vez para actualizar estado inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // sin dependencias: se monta una sola vez

  return (
    <Box
      sx={{
        position: "sticky",
        top: 70,
        borderBottom: `1px solid ${hasScrolled ? "#DFDFDF" : "transparent"}`,
        transition: "all 200ms",
        bgcolor: "primary.main",
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
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: "#DFDFDF",
          px: 4,
          py: 1.5,
          height: 60,
          transition: "all 200ms",
          lineHeight: 1,
          fontSize: 28,
          transformOrigin: "center left",
          transform: hasScrolled ? "scale(0.55)" : "scale(1)",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "all 200ms",
          }}
        >
          <Icon
            size={40}
            icon="asterisk"
            color="inherit"
            style={{ transition: "all 200ms" }}
          />
        </Box>
        {children}
      </Typography>
    </Box>
  );
};
