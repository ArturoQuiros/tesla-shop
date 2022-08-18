import { createContext } from "react";

interface ContextProps {
  //props
  isMenuOpen: boolean;

  //methods

  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
