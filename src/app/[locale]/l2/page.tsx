"use client";

import Icon from "@/components/icon/Icon";
import { NewsletterField } from "@/components/newsletter-field/NewsletterField";
import { Box, Button, IconButton } from "@mui/material";
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
      <Box
        sx={{
          bgcolor: "#323232",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <NewsletterField onSubmit={() => {}} isSubmited={false} />
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button variant="contained">Hola 1 </Button>
        <Button variant="contained" disabled>
          Hola 1
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button variant="contained" color="secondary">
          Hola 2
        </Button>
        <Button variant="contained" color="secondary" disabled>
          Hola 2
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button variant="text" color="primary">
          Hola 1
        </Button>
        <Button variant="text" disabled>
          Hola 1
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "#323232",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button variant="text" color="secondary">
          Hola 1
        </Button>
        <Button variant="text" color="secondary" disabled>
          Hola 1
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "#323232",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button variant="text" size="large">
          Hola 1
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton size="medium" color="primary">
          <Icon icon="arrow-right" size={24} />
        </IconButton>
        <IconButton size="medium" color="primary" disabled>
          <Icon icon="arrow-right" size={24} />
        </IconButton>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton size="medium" color="secondary">
          <Icon icon="arrow-right" size={24} />
        </IconButton>
        <IconButton size="medium" color="secondary" disabled>
          <Icon icon="arrow-right" size={24} />
        </IconButton>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton size="large" color="primary">
          <Icon icon="arrow-right" size={40} />
        </IconButton>
        <IconButton size="large" color="primary" disabled>
          <Icon icon="arrow-right" size={40} />
        </IconButton>
      </Box>
      <Box
        sx={{
          bgcolor: "#323232",
          display: "flex",
          gap: 5,
          p: 10,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton size="large" color="secondary">
          <Icon icon="arrow-right" size={40} />
        </IconButton>
        <IconButton size="large" color="secondary" disabled>
          <Icon icon="arrow-right" size={40} />
        </IconButton>
      </Box>
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
