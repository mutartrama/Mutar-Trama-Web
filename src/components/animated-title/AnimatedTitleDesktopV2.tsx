import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import Icon from "../icon/Icon";
import { Link } from "@/i18n/routing";
import { useGlobalNavigationLayout } from "@/contexts/global-navigation-layout";
import { animate } from "motion";

interface AnimatedTitleProps {
  defaultBackgroundColor: string;
  indexPosition: number;
  [x: string]: any;
}

export const AnimatedTitleDesktopV2 = ({
  children,
  defaultBackgroundColor,
  to,
  indexPosition,
  ...props
}: PropsWithChildren<AnimatedTitleProps>) => {
  const { isLoaded, lastPinnedIndex, backgroundColor } =
    useGlobalNavigationLayout();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  // useEffect(() => {
  //   const updatePositions = () => {
  //     const pageContainer = document.querySelector(
  //       ".page-container",
  //     ) as HTMLElement;
  //     const titles = document.querySelectorAll(".home-section-title");

  //     const newsSection = document.querySelector(".news-section");
  //     const aboutNetSection = document.querySelector(".about-net-section");
  //     const projectsSection = document.querySelector(".projects-section");
  //     const participateSection = document.querySelector(".participate-section");

  //     if (
  //       newsSection &&
  //       aboutNetSection &&
  //       projectsSection &&
  //       participateSection
  //     ) {
  //       const newsSectionRectTop = newsSection.getBoundingClientRect().top;
  //       const aboutNetSectionRectTop =
  //         aboutNetSection.getBoundingClientRect().top;
  //       const projectsSectionRectTop =
  //         projectsSection.getBoundingClientRect().top;
  //       const participateSectionRectTop =
  //         participateSection.getBoundingClientRect().top;

  //       const tops = [
  //         newsSectionRectTop,
  //         aboutNetSectionRectTop,
  //         projectsSectionRectTop,
  //         participateSectionRectTop,
  //       ];

  //       titles.forEach((title, index) => {
  //         (title as HTMLDivElement).style.top = `${tops[index]}px`;
  //         (title as HTMLDivElement).style.height =
  //           `${pageContainer.scrollHeight - tops[index]}px`;
  //       });
  //     }
  //   };

  //   // Inicializa las posiciones
  //   updatePositions();

  //   // Agrega el manejador de eventos resize
  //   window.addEventListener("resize", updatePositions);

  //   // Limpia el evento al desmontar el componente
  //   return () => {
  //     window.removeEventListener("resize", updatePositions);
  //   };
  // }, []);

  // useEffect(() => {
  //   const pageContainer = document.querySelector(
  //     ".page-container",
  //   ) as HTMLElement;
  //   const handleScroll = () => {
  //     const titles = Array.from(
  //       document.querySelectorAll(
  //         ".home-section-title > [data-cy='homeTitle']",
  //       ),
  //     );

  //     let temporalLastIndex = -1;

  //     titles.forEach((title, index) => {
  //       const rect = title.getBoundingClientRect();
  //       // Detecta si el título sticky está en la posición "pinneada"

  //       if (Math.round(rect.top) === 0) {
  //         // setLastPinnedIndex(index);
  //         temporalLastIndex = index;
  //       }
  //     });

  //     setLastPinnedIndex(temporalLastIndex);

  //     if (titleRef.current) {
  //       const topPosition = titleRef.current.getBoundingClientRect().top;
  //       const stickyTop =
  //         parseFloat((titleRef.current as HTMLHeadingElement).style.top) || 0;

  //       setIsPinned(topPosition <= stickyTop);
  //     }
  //   };

  //   pageContainer.addEventListener("scroll", handleScroll);

  //   return () => {
  //     pageContainer.removeEventListener("scroll", handleScroll);
  //   };

  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   const colors = ["#DFDFDF", "#6856D9", "#1F1F1F", "#DFDFDF", "#1F1F1F"];
  //   const titles = Array.from(
  //     document.querySelectorAll(".home-section-title > [data-cy='homeTitle']"),
  //   );

  //   titles.forEach((_, i) => {
  //     if (lastPinnedIndex > -1 && i <= lastPinnedIndex) {
  //       updateBackgroundColor(colors[lastPinnedIndex + 1]);
  //     } else {
  //       if (lastPinnedIndex === -1) {
  //         updateBackgroundColor(colors[0]);
  //       }
  //     }
  //   });

  //   // eslint-disable-next-line
  // }, [lastPinnedIndex]);

  // useEffect(() => {
  //   const titles = Array.from(
  //     document.querySelectorAll(".home-section-title > [data-cy='homeTitle']"),
  //   );

  //   titles.forEach((t, i) => {
  //     const title = t as HTMLHeadingElement;
  //     if (lastPinnedIndex > -1 && i <= lastPinnedIndex) {
  //       title.style.backgroundColor = backgroundColor;
  //       title.style.color = lastPinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF";
  //       title.style.borderRight = disableBorder
  //         ? ""
  //         : `1px solid ${lastPinnedIndex === 2 ? "#1F1F1F" : "#DFDFDF"}`;
  //     } else {
  //       title.style.borderRight = "1px solid transparent";
  //     }
  //   });

  //   // eslint-disable-next-line
  // }, [backgroundColor]);

  // useEffect(() => {
  //   const mainHeader = document.getElementById("main-header") as HTMLDivElement;
  //   const switchLanguage = document.getElementById(
  //     "switch-language",
  //   ) as HTMLDivElement;

  //   if (mainHeader) {
  //     mainHeader.style.backgroundColor = backgroundColor;

  //     const svgs = mainHeader.querySelectorAll("svg");

  //     svgs.forEach((svg: SVGElement) => {
  //       if (backgroundColor === "#1F1F1F" || backgroundColor === "#6856D9") {
  //         svg.style.fill = "#DFDFDF";
  //         switchLanguage.style.color = "#DFDFDF";
  //       } else {
  //         svg.style.fill = "#1F1F1F";
  //         switchLanguage.style.color = "#1F1F1F";
  //       }
  //     });
  //   }
  // }, [backgroundColor]);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      animate(containerRef.current, { opacity: 1, animationDuration: 1 });
    }
  }, [isLoaded]);

  const asterikHandler = Number(indexPosition) === lastPinnedIndex;

  // const isPinned = useMemo(
  //   () => indexPosition < lastPinnedIndex,
  //   [indexPosition, lastPinnedIndex],
  // );
  const isAtBottom = useMemo(() => lastPinnedIndex === 4, [lastPinnedIndex]);

  // console.log(isPinned, isAtBottom)
  const bgColor = backgroundColor ? backgroundColor : defaultBackgroundColor;
  const fgColor = bgColor === "#DFDFDF" ? "#1F1F1F" : "#DFDFDF";

  return (
    <Box
      ref={containerRef}
      className="home-section-title"
      sx={{
        position: "absolute",
        // height: `${documentHeight}px`,
        zIndex: 10,
        opacity: 0,
      }}
    >
      <Typography
        ref={titleRef}
        data-cy="homeTitle"
        sx={{
          fontSize: 32,
          position: "sticky",
          zIndex: 5,
          bgcolor: bgColor,
          color: fgColor,
          px: 4,
          py: 2,
          pb: 6,
          height: "100vh",
          width: "75px",
          transition: "fontSize 300ms, background 900ms, color 300ms",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          border: "1px solid transparent",
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
                width: isAtBottom ? 32 : !asterikHandler ? 0 : 40,
                transform: `scale(${isAtBottom ? 1 : !asterikHandler ? 0 : 1})`,
                transition: "all 100ms",
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
