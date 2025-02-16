"use client";
import { useStickyObserver } from "@/hooks/useStickyObserver";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface GlobalNavigationLayoutContextValues {
  pageWrapperRef: RefObject<HTMLDivElement> | null;
  isMenuOpen: boolean;
  backgroundColor: string | undefined;
  toggleMenuOpen: (value?: boolean) => void;

  lastPinnedIndex: number;
  isLoaded: boolean;
  hasLoadedData: (value: boolean) => void;
}

const colors = [
  "#DFDFDF",
  "#6856D9",
  "#1F1F1F",
  "#DFDFDF",
  "#1F1F1F",
  "#000000",
];

const GlobalNavigationLayoutContext =
  createContext<GlobalNavigationLayoutContextValues>({
    pageWrapperRef: null,
    isMenuOpen: false,
    backgroundColor: undefined,
    toggleMenuOpen: () => {},

    lastPinnedIndex: -1,
    isLoaded: false,
    hasLoadedData: (value: boolean) => value,
  });

export const GlobalNavigationLayoutProvider = ({
  children,
}: PropsWithChildren) => {
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isLayoutLoaded, setIsLayoutLoaded] = useState(false);

  const toggleMenuOpen = (value?: boolean) => {
    setIsMenuOpen((prevState) => {
      let newState = !prevState;

      if (typeof value === "boolean") newState = value;
      else pageWrapperRef.current?.scrollTo({ top: newState ? 100000 : 0 });

      return newState;
    });
  };

  const hasLoadedData = (value: boolean) => setDataLoaded(value);

  const mobileSelectors = [
    ".home-section-title:first-of-type",
    ".home-section-title:nth-of-type(2)",
    ".home-section-title:nth-of-type(3)",
    ".home-section-title:nth-of-type(4)",
  ];

  const desktopSelectors = [
    ".home-section-title:nth-of-type(2) > [data-cy='homeTitle']",
    ".home-section-title:nth-of-type(4) > [data-cy='homeTitle']",
    ".home-section-title:nth-of-type(6) > [data-cy='homeTitle']",
    ".home-section-title:nth-of-type(8) > [data-cy='homeTitle']",
  ];

  const selectors = isLargeScreen ? desktopSelectors : mobileSelectors;

  const lastPinnedIndex = useStickyObserver(selectors, pageWrapperRef);

  const bgColor =
    lastPinnedIndex !== -1 ? colors[lastPinnedIndex + 1] : undefined;

  useEffect(() => {
    const updatePositions = () => {
      if (isDataLoaded && isLargeScreen) {
        const titles = document.querySelectorAll(".home-section-title");

        const newsSection = document.querySelector(".news-section");
        const aboutNetSection = document.querySelector(".about-net-section");
        const projectsSection = document.querySelector(".projects-section");
        const participateSection = document.querySelector(
          ".participate-section",
        );
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

          console.log(tops);

          titles.forEach((title, index) => {
            if (pageWrapperRef.current) {
              (title as HTMLDivElement).style.top = `${tops[index]}px`;
              (title as HTMLDivElement).style.height =
                `${pageWrapperRef.current.scrollHeight - tops[index]}px`;
            }
          });
        }
      }

      setIsLayoutLoaded(true);
    };

    // Inicializa las posiciones
    updatePositions();

    // Agrega el manejador de eventos resize
    window.addEventListener("resize", updatePositions);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [isDataLoaded, isLargeScreen, pageWrapperRef]);

  const isLoaded = isLayoutLoaded && isDataLoaded;
  return (
    <GlobalNavigationLayoutContext.Provider
      value={{
        pageWrapperRef,
        backgroundColor: bgColor,
        isMenuOpen,
        toggleMenuOpen,

        lastPinnedIndex,
        isLoaded,
        hasLoadedData,
      }}
    >
      {children}
    </GlobalNavigationLayoutContext.Provider>
  );
};

export const useGlobalNavigationLayout = () =>
  useContext(GlobalNavigationLayoutContext);
