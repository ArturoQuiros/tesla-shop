import { FC, PropsWithChildren, useReducer } from "react";
import { IUser } from "../../interfaces";
import { AuthContext, AuthReducer } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const initalState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren<AuthState>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, initalState);

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //methods

        //props
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
