import { debounce } from "@/lib/debounce";
import { RefObject, useEffect, useState } from "react";

export const useStickyObserver = (
  containerSelectors: string[],
  pageWrapperRef: RefObject<HTMLDivElement>,
) => {
  const [lastPinnedIndex, setLastPinnedIndex] = useState(-1);

  useEffect(() => {
    const pageWrapper = pageWrapperRef.current;
    if (!pageWrapper) return;

    const containers = containerSelectors.map((selector) =>
      pageWrapper.querySelector(selector),
    );

    if (!containers.length) return;

    const handleScrollEnd = debounce(() => {
      let latestPinnedIndex = -1;

      containers.forEach((container, index) => {
        if (!container) return;

        const rect = container.getBoundingClientRect();

        // Si el contenedor está en el top (sticky activo)
        if (rect.top === 70 + index * 42 && rect.bottom > 0) {
          latestPinnedIndex = index;
        }
      });

      setLastPinnedIndex(latestPinnedIndex);
    }, 100);

    const handleScroll = () => {
      handleScrollEnd(); // Llama al debounce
    };

    pageWrapper.addEventListener("scroll", handleScroll);

    handleScroll(); // Ejecutamos una vez para el estado inicial

    return () => {
      pageWrapper.removeEventListener("scroll", handleScroll);
    };
  }, [containerSelectors, pageWrapperRef]);

  return lastPinnedIndex;
};
