import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import Icon from "../icon/Icon";
import { Link } from "@/i18n/routing";

interface AnimatedTitleProps {
  backgroundColor: string;
  [x: string]: any;
}

export const AnimatedTitleDesktopV2 = ({
  children,
  backgroundColor,
  to,
  disableBorder,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [bgColor, setBgColor] = useState<string>("#DFDFDF");
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const updatePositions = () => {
      const titles = document.querySelectorAll(".home-section-title");

      const newsSection = document.querySelector(".news-section");
      const aboutNetSection = document.querySelector(".about-net-section");
      const projectsSection = document.querySelector(".projects-section");
      const participateSection = document.querySelector(".participate-section");

      if (
        newsSection &&
        aboutNetSection &&
        projectsSection &&
        participateSection
      ) {
        const newsSectionRectTop = newsSection.getBoundingClientRect().top;
        const aboutNetSectionRectTop =
          aboutNetSection.getBoundingClientRect().top;
        const projectsSectionRectTop =
          projectsSection.getBoundingClientRect().top;
        const participateSectionRectTop =
          participateSection.getBoundingClientRect().top;

        const tops = [
          newsSectionRectTop,
          aboutNetSectionRectTop,
          projectsSectionRectTop,
          participateSectionRectTop,
        ];

        titles.forEach((title, index) => {
          (title as HTMLDivElement).style.top = `${tops[index]}px`;
          (title as HTMLDivElement).style.height =
            `${document.documentElement.scrollHeight - tops[index]}px`;
        });
      }
    };

    // Inicializa las posiciones
    updatePositions();

    // Agrega el manejador de eventos resize
    window.addEventListener("resize", updatePositions);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  useEffect(() => {
    const colors = ["#DFDFDF", "#6856D9", "#1F1F1F", "#DFDFDF", "#1F1F1F"];
    const handleScroll = () => {
      const titles = Array.from(
        document.querySelectorAll(
          ".home-section-title > [data-cy='homeTitle']",
        ),
      );
      let lastPinnedIndex = -1;

      titles.forEach((title, index) => {
        const rect = title.getBoundingClientRect();

        // Detecta si el título sticky está en la posición "pinneada"
        if (rect.top === 0) {
          lastPinnedIndex = index; // Actualiza con el índice más reciente
        }
      });

      titles.forEach((t, i) => {
        const title = t as HTMLHeadingElement;
        if (lastPinnedIndex > -1 && i <= lastPinnedIndex) {
          title.style.backgroundColor = colors[lastPinnedIndex + 1];
          title.style.color = lastPinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF";
          title.style.borderRight = disableBorder
            ? ""
            : `1px solid ${lastPinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF"}`;
          setBgColor(colors[lastPinnedIndex + 1]);
        } else {
          title.style.borderRight = "1px solid transparent";
          if (lastPinnedIndex === -1) {
            setBgColor(colors[0]);
          }
        }
      });

      if (titleRef.current) {
        const topPosition = titleRef.current.getBoundingClientRect().top;
        const stickyTop =
          parseFloat((titleRef.current as HTMLHeadingElement).style.top) || 0;

        setIsPinned(topPosition <= stickyTop);
      }

      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      const atBottom = scrollPosition + viewportHeight >= documentHeight;
      setIsAtBottom(atBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const mainHeader = document.getElementById("main-header") as HTMLDivElement;
    const switchLanguage = document.getElementById(
      "switch-language",
    ) as HTMLDivElement;

    if (mainHeader) {
      mainHeader.style.backgroundColor = bgColor;

      const svgs = mainHeader.querySelectorAll("svg");

      svgs.forEach((svg: SVGElement) => {
        if (bgColor === "#1F1F1F") {
          svg.style.fill = "#DFDFDF";
          switchLanguage.style.color = "#DFDFDF";
        } else {
          svg.style.fill = "#1F1F1F";
          switchLanguage.style.color = "#1F1F1F";
        }
      });
    }
  }, [bgColor]);

  return (
    <Box
      ref={containerRef}
      className="home-section-title"
      sx={{
        position: "absolute",
        // height: `${documentHeight}px`,
        zIndex: 10,
      }}
    >
      <Typography
        ref={titleRef}
        data-cy="homeTitle"
        sx={{
          color: "white",
          fontSize: 32,
          position: "sticky",
          zIndex: 5,
          bgcolor: backgroundColor,
          px: 4,
          py: 2,
          pb: 6,
          height: "100vh",
          width: "75px",
          transition: "fontSize 100ms",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          border: "1px solid transparent",
          transitionDelay: ".25s",
        }}
        {...props}
      >
        <Link
          href={`#${to}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            component="span"
            sx={{
              display: "flex",
              gap: 2,
              transform: "rotate(-90deg) ",
              textWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <Box
              component="span"
              className={isAtBottom ? "asterik-delay" : ""}
              sx={{
                display: "flex",
                alignItems: "center",
                width: isAtBottom && !disableBorder ? 32 : isPinned ? 0 : 40,
                transform: `scale(${isPinned && !isAtBottom ? 0 : 1})`,
                transition: "all 100ms",
                transitionDelay: ".25s",
              }}
            >
              <Icon icon="asterisk" size={40} color="inherit" />
            </Box>
            {children}
          </Box>
        </Link>
      </Typography>
    </Box>
  );
};
