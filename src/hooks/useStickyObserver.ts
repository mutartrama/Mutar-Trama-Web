import { RefObject, useEffect, useState } from "react";

export const useStickyObserver = (
  containerSelectors: string[],
  pageWrapperRef: RefObject<HTMLDivElement>,
) => {
  const [lastPinnedIndex, setLastPinnedIndex] = useState(-1);

  useEffect(() => {
    const pageWrapper = pageWrapperRef.current;
    if (!pageWrapper) return;

    const containers = containerSelectors
      .map((selector) => pageWrapper.querySelector(selector))
      .filter(Boolean) as HTMLElement[];

    if (!containers.length) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          let latestPinnedIndex = -1;

          for (let index = 0; index < containers.length; index++) {
            const container = containers[index];
            const rect = container.getBoundingClientRect();

            if (rect.top === 70 + index * 42 && rect.bottom > 0) {
              latestPinnedIndex = index;
            }
          }

          if (latestPinnedIndex !== lastPinnedIndex) {
            setLastPinnedIndex(latestPinnedIndex);
          }

          ticking = false;
        });
      }
    };

    pageWrapper.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutamos una vez al inicio

    return () => {
      pageWrapper.removeEventListener("scroll", handleScroll);
    };
  }, [containerSelectors, pageWrapperRef, lastPinnedIndex]);

  return lastPinnedIndex;
};
