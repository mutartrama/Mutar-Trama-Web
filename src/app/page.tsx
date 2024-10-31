"use client";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box paddingBottom={8}>
      <Box
        sx={{
          textAlign: "center",
          paddingTop: 4,
        }}
      >
        <Typography variant="h1">Mutar Trama</Typography>
        <Typography sx={{ letterSpacing: 15 }}>Coming soon...</Typography>
      </Box>
      <Box sx={{ maxWidth: 1300, margin: "0 auto", paddingTop: 8 }}>
        <h4>Design System</h4>
        <Box>
          <h6>Colors</h6>
          <Stack direction="row" gap={4} sx={{ pb: 4 }}>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.background.default,
                  border: "1px solid white",
                })}
              />
              <small>Background default</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.background.paper,
                  border: "1px solid white",
                })}
              />
              <small>Background Paper</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.text.primary,
                  border: "1px solid white",
                })}
              />
              <small>Text Primary</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.text.secondary,
                  border: "1px solid white",
                })}
              />
              <small>Text Secondary</small>
            </Box>
          </Stack>
          <Stack direction="row" gap={4} sx={{ pb: 4 }}>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.primary.light,
                  border: "1px solid white",
                })}
              />
              <small>Primary - Light</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.primary.Box,
                  border: "1px solid white",
                })}
              />
              <small>Primary - Main</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.primary.dark,
                  border: "1px solid white",
                })}
              />
              <small>Primary - Dark</small>
            </Box>

            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.secondary.light,
                  border: "1px solid white",
                })}
              />
              <small>Secondary - Light</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.secondary.main,
                  border: "1px solid white",
                })}
              />
              <small>Secondary - Main</small>
            </Box>
            <Box sx={{ width: 140 }}>
              <Box
                sx={({ palette }) => ({
                  width: 100,
                  height: 100,
                  bgcolor: palette.secondary.dark,
                  border: "1px solid white",
                })}
              />
              <small>Secondary - Dark</small>
            </Box>
          </Stack>
        </Box>
        <hr />
        <Box>
          <h6>Typography</h6>
          <Typography variant="h1">H1 - Mutar Trama</Typography>
          <Typography variant="h2">H2 - Mutar Trama</Typography>
          <Typography variant="h3">H3 - Mutar Trama</Typography>
          <Typography variant="h4">H4 - Mutar Trama</Typography>
          <Typography variant="h5">H5 - Mutar Trama</Typography>
          <Typography variant="h6">H6 - Mutar Trama</Typography>
          <Typography variant="body1" fontWeight="400">
            Body 1 - Mutar Trama
          </Typography>
          <Typography variant="body2">Body 2 - Mutar Trama</Typography>
          <Link href="#">Enlace</Link>
        </Box>
      </Box>
    </Box>
  );
}
