import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import Icon from "../icon/Icon";

interface AnimatedTitleProps {
  backgroundColor: string;
  [x: string]: any;
}

export const AnimatedTitleMobile = ({
  children,
  backgroundColor,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [bgColor, setBgColor] = useState<string>("#DFDFDF");
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const colors = ["#DFDFDF", "#6856D9", "#1F1F1F", "#DFDFDF", "#1F1F1F"];
    const titles = document.querySelectorAll(".home-section-title");

    const stickyPoints = Array.from(titles).map(
      (_, index) => (index === 0 ? 69 : 69 + 41 * index), // Ajustamos con el -1px según el índice
    );

    titles.forEach((title, index) => {
      const position = index + 1;
      const titleElement = title as HTMLHeadingElement;

      if (position === 1) {
        titleElement.style.top = "69px";
      } else {
        titleElement.style.top = `${(position - 1) * 41 + 69}px`;
      }
    });

    const handleScroll = () => {
      let lastPinnedIndex = -1;
      let pinnedIndex = -1;
      let isAnyPinned = false;

      if (titleRef.current) {
        const topPosition = titleRef.current.getBoundingClientRect().top;
        // Convertimos `style.top` de string a número para comparar
        const stickyTop = parseFloat(
          (titleRef.current as HTMLHeadingElement).style.top,
        );

        // Chequea si el elemento está en la posición sticky
        setIsPinned(topPosition <= stickyTop);
      }

      // Detectar qué título está en el viewport

      titles.forEach((title, index) => {
        const titleElement = title as HTMLHeadingElement;
        const rect = titleElement.getBoundingClientRect();
        const expectedTop = stickyPoints[index];

        // Detectar si un título está pineado
        if (Math.abs(rect.top - expectedTop) <= 3) {
          pinnedIndex = index; // Guardamos el índice del último título pineado
          isAnyPinned = true; // Marcamos que al menos uno está pineado
        }
      });

      titles.forEach((e, i) => {
        const title = e as HTMLHeadingElement;
        if (pinnedIndex > -1 && i <= pinnedIndex) {
          title.style.backgroundColor = colors[pinnedIndex + 1];
          title.style.color = pinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF";
          title.style.borderBottom = `1px solid ${pinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF"}`;
        } else {
          title.style.borderBottom = "1px solid transparent";
        }
      });

      if (isAnyPinned) {
        if (pinnedIndex !== lastPinnedIndex) {
          setBgColor(colors[pinnedIndex + 1]);
          lastPinnedIndex = pinnedIndex; // Actualizamos el último índice pineado
        }
      } else {
        setBgColor(colors[0]);
      }

      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Detectar si está en el final
      const atBottom = scrollPosition + viewportHeight >= documentHeight;
      setIsAtBottom(atBottom);
    };

    // Agrega el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mainHeader = document.getElementById("main-header") as HTMLDivElement;

    if (mainHeader) {
      mainHeader.style.backgroundColor = bgColor;

      const svgs = mainHeader.querySelectorAll("svg");

      svgs.forEach((svg: SVGElement) => {
        if (bgColor === "#1F1F1F") {
          svg.style.filter = "invert(1)";
        } else {
          svg.style.filter = "invert(0)";
        }
      });
    }
  }, [bgColor]);

  return (
    <Typography
      ref={titleRef}
      data-cy="homeTitle"
      className="home-section-title"
      sx={{
        fontSize: isPinned ? 18 : 32,
        display: "flex",
        alignItems: "center",
        gap: 2,
        position: "sticky",
        bgcolor: backgroundColor,
        color: backgroundColor === "#DFDFDF" ? "#1F1F1F" : "#DFDFDF",
        px: 4,
        py: 2,
        height: isPinned ? 42 : 64,
        transition: "all 100ms",
      }}
      {...props}
    >
      <Box
        component="span"
        className={isAtBottom ? "asterik-delay" : ""}
        sx={{
          display: "flex",
          alignItems: "center",
          width: isAtBottom ? 18 : isPinned ? 0 : 40,
          transform: `scale(${isPinned && !isAtBottom ? 0 : 1})`,
          transition: "all 100ms",
        }}
      >
        <Icon icon="asterisk" size={isAtBottom ? 18 : 40} color="inherit" />
      </Box>
      {children}
    </Typography>
  );
};
