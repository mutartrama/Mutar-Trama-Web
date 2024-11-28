"use client";
import { Box } from "@mui/material";
import { useLayoutEffect } from "react";
import { animate, scroll } from "motion";

import "./page.css";

// gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useLayoutEffect(() => {
    const menuItem1 = document.getElementById("menu-item-1");
    const menuItem2 = document.getElementById("menu-item-2");
    const menuItem3 = document.getElementById("menu-item-3");
    const menuItem4 = document.getElementById("menu-item-4");

    const panelWidth = window.innerWidth - (75 * 4 + 120);

    const newsItem = document.querySelectorAll(".news-panel");
    const newsSection = document.querySelector(".news-section");

    const projectsItem = document.querySelectorAll(".news-panel");
    const projectsSection = document.querySelector(".projects-section");

    // Set sticky padding

    if (menuItem1 && menuItem2 && menuItem3 && menuItem4) {
      menuItem1.style.paddingTop = "100vh";
      menuItem2.style.paddingTop = `calc(100vh + ${newsItem.length}00vh)`;
      menuItem3.style.paddingTop = `calc(200vh + ${newsItem.length}00vh)`;
      menuItem4.style.paddingTop = `calc(200vh + ${newsItem.length + projectsItem.length}00vh)`;
    }

    // Animate gallery horizontally during vertical scroll
    if (newsSection) {
      scroll(
        animate("#news-container", {
          transform: [
            "none",
            `translateX(-${newsItem.length * panelWidth}px )`,
          ],
        }),
        { target: newsSection },
      );
    }
    if (projectsSection) {
      scroll(
        animate("#projects-container", {
          transform: [
            "none",
            `translateX(-${projectsItem.length * panelWidth}px )`,
          ],
        }),
        { target: projectsSection },
      );
    }
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "120px repeat(4, 75px) 1fr",
      }}
    >
      <Asside />
      <Box
        sx={{
          position: "fixed",
          bgcolor: "magenta",
          width: "calc(120px + 300px)",
          height: "100vh",
          zIndex: 1,
        }}
      />

      <MenuItem id="menu-item-1" />
      <MenuItem id="menu-item-2" />
      <MenuItem id="menu-item-3" />
      <MenuItem id="menu-item-4" />

      <Box>
        <Box
          sx={{
            height: "100vh",
            bgcolor: "lightgray",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-1-1"></Panel>
        </Box>

        <Box
          className="news-section"
          sx={{
            height: "300vh",
            bgcolor: "silver",
            position: "relative",
          }}
        >
          <Box
            id="news-container"
            sx={{ display: "flex", position: "sticky", top: 0 }}
          >
            <Box
              className="news-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
            <Box
              className="news-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
            <Box
              className="news-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: "100vh",
            bgcolor: "lightgray",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-2-1"></Panel>
        </Box>

        <Box
          className="projects-section"
          sx={{
            height: "300vh",
            bgcolor: "silver",
            position: "relative",
          }}
        >
          <Box
            id="projects-container"
            sx={{ display: "flex", position: "sticky", top: 0 }}
          >
            <Box
              className="projects-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
            <Box
              className="projects-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
            <Box
              className="projects-panel"
              sx={{
                display: "flex",
                width: `calc(100vw - (${75 * 4}px + 120px))`,
                height: "100vh",
                flex: "0 0 auto",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Textum />
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            height: "100vh",
            bgcolor: "chocolate",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-3-1"></Panel>
        </Box>

        <Box
          sx={{
            height: "100vh",
            bgcolor: "coral",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-4-1"></Panel>
          <Panel id="panel-4-2"></Panel>
          <Panel id="panel-4-3"></Panel>
        </Box>

        <Box
          sx={{
            height: "100vh",
            bgcolor: "crimson",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-5-1"></Panel>
        </Box>
*/}
        <Box
          sx={{
            height: "100vh",
            bgcolor: "salmon",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-6-1"></Panel>
        </Box>
      </Box>
    </Box>
  );
}

const MenuItem = ({ id }: { id: any }) => (
  <Box id={id}>
    <Box
      sx={{
        width: 75,
        height: "100vh",
        bgcolor: "red",
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      {id}
    </Box>
  </Box>
);

const Panel = ({ id }: { id: any }) => (
  <Box id={id} sx={{ flex: 1, height: "100vh" }}>
    {id}
  </Box>
);

const Asside = () => (
  <Box sx={{ position: "relative", bgcolor: "blue", zIndex: 10 }}>
    <Box sx={{ position: "fixed" }}>MENU</Box>
  </Box>
);

const Textum = () => (
  <Box
    sx={{
      fontSize: 48,
      color: "black",
    }}
  >
    LOREM IPSUM
  </Box>
);
