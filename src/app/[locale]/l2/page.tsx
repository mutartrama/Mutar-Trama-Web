"use client";

import { Box } from "@mui/material";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const container = document.querySelector(".horizontal-scroll");

    if (container) {
      const handleWheel = (e: any) => {
        // Si hay desplazamiento vertical (deltaY), se usa para mover el scroll horizontal (scrollLeft)
        if (e.deltaY !== 0) {
          container.scrollLeft += e.deltaY;
          e.preventDefault(); // Prevenir el comportamiento por defecto (scroll vertical)
        }
      };

      container.addEventListener("wheel", handleWheel);

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);
  return (
    <Box sx={{ bgcolor: "blue", width: "99vw", overflowX: "hidden" }}>
      <Box sx={{ bgcolor: "green", height: "100vh" }}></Box>
      <Box
        className="horizontal-scroll"
        sx={{ height: "100vh", display: "flex", overflowX: "scroll" }}
      >
        <Box sx={{ bgcolor: "cyan", height: "100vh", flex: "0 0 100vw" }}></Box>
        <Box
          sx={{ bgcolor: "magenta", height: "100vh", flex: "0 0 100vw" }}
        ></Box>
        <Box
          sx={{ bgcolor: "yellow", height: "100vh", flex: "0 0 100vw" }}
        ></Box>
      </Box>
      <Box sx={{ bgcolor: "red", height: "100vh" }}></Box>
    </Box>
  );
}
