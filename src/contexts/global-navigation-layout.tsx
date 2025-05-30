"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

interface GlobalNavigationLayoutContextValues {
  isMenuOpen: boolean;
  toggleMenuOpen: (value?: boolean) => void;
}

const GlobalNavigationLayoutContext =
  createContext<GlobalNavigationLayoutContextValues>({
    isMenuOpen: false,
    toggleMenuOpen: () => {},
  });

export const GlobalNavigationLayoutProvider = ({
  children,
}: PropsWithChildren) => {
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = (value?: boolean) => {
    setIsMenuOpen((prevState) => {
      let newState = !prevState;

      if (typeof value === "boolean") newState = value;
      else pageWrapperRef.current?.scrollTo({ top: newState ? 100000 : 0 });

      return newState;
    });
  };

  return (
    <GlobalNavigationLayoutContext.Provider
      value={{
        isMenuOpen,
        toggleMenuOpen,
      }}
    >
      {children}
    </GlobalNavigationLayoutContext.Provider>
  );
};

export const useGlobalNavigationLayout = () =>
  useContext(GlobalNavigationLayoutContext);
