import Cookies from "js-cookie";
import { FC, PropsWithChildren, useReducer } from "react";
import { tesloAPI } from "../../api";
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

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloAPI.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //methods
        loginUser,

        //props
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
