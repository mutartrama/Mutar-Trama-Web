"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

export default function HoverCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "#eee",
      }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          height: hovered ? "90%" : "450px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          width: 300,
          backgroundColor: "#fff",
          overflow: "hidden",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Imagen que se achica */}

        <motion.div
          animate={{ height: hovered ? 100 : 300 }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{
            overflow: "hidden", // Muy importante
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/duwbaf7b1/image/upload/v1746928402/maxresdefault_vkbgbt.jpg"
            alt="gatito"
            sx={{
              width: "300px",
              height: "300px",
              display: "block",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Contenido visible siempre */}
        <Box p={2}>
          <Typography variant="h6">Mi hermosa card</Typography>
          <Typography variant="body2" color="text.secondary">
            Esto se ve siempre.
          </Typography>

          {/* Contenido que aparece con hover */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 10,
              height: hovered ? "auto" : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              overflow: "hidden",
            }}
          >
            <Typography>
              Este contenido aparece con fade y se queda montado todo el tiempo.
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
