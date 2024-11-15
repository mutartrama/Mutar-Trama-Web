import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Icon from "../icon/Icon";

export const HomeSectionTitle = ({ blok }: PropsWithChildren<any>) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const titles = document.querySelectorAll(".home-section-title");
    titles.forEach((title, index) => {
      const position = index + 1;
      const titleElement = title as HTMLHeadingElement;

      if (position === 1) {
        titleElement.style.top = "70px";
      } else {
        titleElement.style.top = `${(position - 1) * 41 + 70}px`;
      }
    });

    const handleScroll = () => {
      if (titleRef.current) {
        const topPosition = titleRef.current.getBoundingClientRect().top;
        // Convertimos `style.top` de string a número para comparar
        const stickyTop = parseFloat(
          (titleRef.current as HTMLHeadingElement).style.top,
        );

        // Chequea si el elemento está en la posición sticky
        setIsPinned(topPosition <= stickyTop);
      }
    };

    // Agrega el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Typography
      ref={titleRef}
      data-cy="homeTitle"
      className="home-section-title"
      sx={{
        color: "white",
        fontSize: isPinned ? 18 : 32,
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginLeft: { lg: "120px", xl: "160px" },
        position: "sticky",
        zIndex: 5,
        bgcolor: blok.backgroundColor,
        px: 4,
        py: 2,
        height: isPinned ? 42 : 64,
        transition: "all 100ms",
      }}
      {...storyblokEditable(blok)}
    >
      <Box
        component="span"
        sx={{
          width: isPinned ? 0 : 40,
          transform: `scale(${isPinned ? 0 : 1})`,
          transition: "all 100ms",
        }}
      >
        <Icon icon="asterisk" size={40} color="inherit" />
      </Box>
      {blok.title}
    </Typography>
  );
};
