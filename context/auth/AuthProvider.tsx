import axios from "axios";
import Cookies from "js-cookie";
import { FC, PropsWithChildren, useReducer, useEffect } from "react";
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

  useEffect(() => {
    checkToken();
  }, []);

  interface tokenResp {
    message: string;
    token: string;
    user: IUser;
  }

  const checkToken = async () => {
    try {
      const { data } = await tesloAPI.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

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

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloAPI.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };
        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: true,
        message: "Unknowkn error",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //methods
        loginUser,
        registerUser,

        //props
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
