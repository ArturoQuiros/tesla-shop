import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, UiReducer } from "./";

export interface UiState {
  isMenuOpen: boolean;
}

const initalState: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<PropsWithChildren<UiState>> = ({ children }) => {
  const [state, dispatch] = useReducer(UiReducer, initalState);

  const toggleSideMenu = () => {
    dispatch({ type: "UI - ToggleMenu" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        //props
        //methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
