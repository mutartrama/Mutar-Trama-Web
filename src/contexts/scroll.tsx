import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";

// Crear el contexto
const ScrollContext = createContext({});

export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const isScrolling = useRef(false);

  useEffect(() => {
    const viewportHeight = window.innerHeight;

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const currentScroll = window.scrollY;
      const scrollUp = event.deltaY < 0;

      const nextScroll = scrollUp
        ? Math.max(
            0,
            Math.floor(currentScroll / viewportHeight) * viewportHeight,
          )
        : Math.ceil((currentScroll + viewportHeight) / viewportHeight) *
          viewportHeight;

      window.scrollTo({
        top: nextScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 500); // Ajusta el tiempo según la duración del scroll
    };

    window.addEventListener("wheel", handleWheel);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
};

// Hook para usar el contexto
export const useScroll = () => useContext(ScrollContext);
