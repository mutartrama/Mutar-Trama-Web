"use client";
import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, scroll } from "motion";

import "./page.css";

const calculatePanelWidth = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth - (75 * 4 + 120);
  } else {
    return 0;
  }
};

export const DesktopHomepage = () => {
  const [panelWidth, setPanelWidth] = useState(calculatePanelWidth());

  const menuItem1 = useRef<HTMLDivElement>(null);
  const menuItem2 = useRef<HTMLDivElement>(null);
  const menuItem3 = useRef<HTMLDivElement>(null);
  const menuItem4 = useRef<HTMLDivElement>(null);

  const newsSection = useRef<HTMLDivElement>(null);
  const newsList = useRef<HTMLDivElement>(null);

  const projectsSection = useRef<HTMLDivElement>(null);
  const projectsList = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const newsItem = document.querySelectorAll(".news-panel");

    const projectsItem = document.querySelectorAll(".news-panel");

    if (
      menuItem1.current &&
      menuItem2.current &&
      menuItem3.current &&
      menuItem4.current
    ) {
      menuItem1.current.style.paddingTop = "100vh";
      menuItem2.current.style.paddingTop = `calc(100vh + ${newsItem.length}00vh)`;
      menuItem3.current.style.paddingTop = `calc(200vh + ${newsItem.length}00vh)`;
      menuItem4.current.style.paddingTop = `calc(200vh + ${newsItem.length + projectsItem.length}00vh)`;
    }
  }, []);

  useLayoutEffect(() => {
    if (newsSection.current && newsList.current) {
      const panelCount =
        newsList.current.querySelectorAll(".news-panel").length;

      scroll(
        animate(newsList.current as any, {
          transform: ["none", `translateX(-${panelCount * panelWidth}px )`],
        }),
        { target: newsSection.current },
      );
    }

    if (projectsSection.current && projectsList.current) {
      const panelCount =
        projectsList.current.querySelectorAll(".projects-panel").length;

      scroll(
        animate(projectsList.current, {
          transform: ["none", `translateX(-${panelCount * panelWidth}px )`],
        }),
        { target: projectsSection.current },
      );
    }
  }, [panelWidth]);

  useEffect(() => {
    const handleResize = () => {
      setPanelWidth(calculatePanelWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "120px repeat(4, fit-content(75px)) 1fr",
      }}
    >
      <Asside />

      <Box ref={menuItem1}>
        <MenuItem />
      </Box>
      <Box ref={menuItem2}>
        <MenuItem />
      </Box>
      <Box ref={menuItem3}>
        <MenuItem />
      </Box>
      <Box ref={menuItem4}>
        <MenuItem />
      </Box>

      <Box>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-1-1"></Panel>
        </Box>

        <Box
          ref={newsSection}
          sx={{
            height: "300vh",
            position: "relative",
          }}
        >
          <Box
            ref={newsList}
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
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Panel id="panel-2-1"></Panel>
        </Box>

        <Box
          ref={projectsSection}
          sx={{
            height: "300vh",
            position: "relative",
          }}
        >
          <Box
            ref={projectsList}
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
        <Box sx={{ height: "100px" }}>Footer</Box>
      </Box>
    </Box>
  );
};

const MenuItem = () => {
  const menuItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menuItems = document.querySelectorAll(".menu-item-animated");
    menuItems.forEach((el, index) => {
      console.log(index);

      const observer = new IntersectionObserver(
        ([entry]) => {
          console.log(entry, index);
          if (entry.isIntersecting) {
            console.log("element is observing index:", index);

            switch (index) {
              case 1:
                menuItems.forEach(
                  (e) => ((e as HTMLDivElement).style.background = "red"),
                );
                document.body.style.background = "red";
                break;
              case 2:
                menuItems.forEach(
                  (e) => ((e as HTMLDivElement).style.background = "green"),
                );
                document.body.style.background = "green";
                break;
              case 3:
                menuItems.forEach(
                  (e) => ((e as HTMLDivElement).style.background = "blue"),
                );
                document.body.style.background = "blue";
                break;
            }

            animate(
              entry.target,
              {
                opacity: [0, 1], // Animación de fade-in
                y: [100, 0], // Animación de desplazamiento (opcional)
              },
              {
                duration: 0.5, // Duración de la animación
              },
            );
          }
        },
        {
          threshold: 0.5,
        },
      );

      observer.observe(el);

      return () => observer.disconnect();
    });
  }, []);

  return (
    <Box
      ref={menuItemRef}
      className="menu-item-animated"
      sx={{
        width: 75,
        height: "100vh",
        bgcolor: "rgb(31, 31, 31)",
        position: "sticky",
        top: 0,
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        fontSize: 32,
        paddingBottom: "2rem",
        textWrap: "nowrap",
        opacity: 0,
        borderRight: "1px solid transparent",
        transition: "background 350ms",
      }}
    >
      <Box sx={{ transform: "rotate(-90deg)" }}>ITEM TEXT SAMPLE</Box>
    </Box>
  );
};

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
