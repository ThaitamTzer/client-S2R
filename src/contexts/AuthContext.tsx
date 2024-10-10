"use client";

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// ** Next Import
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ** Axios
import axiosClient from "@/lib/axios";

// ** Config
import authConfig from "@/config/auth";

import { useLoginModal } from "@/zustand/loginModal";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "@/contexts/types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const { closeModal } = useLoginModal();

  // ** Hooks
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName,
      )!;
      if (storedToken) {
        await axiosClient
          .get(authConfig.meEndpoint)
          .then(async (response) => {
            setUser({ ...response.data });
          })
          .catch(() => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            setUser(null);
            if (
              authConfig.onTokenExpiration === "logout" &&
              !pathName.includes("login")
            ) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    setLoading(true);
    try {
      axiosClient
        .post(authConfig.loginEndpoint, params)
        .then(async (response) => {
          setLoading(false);
          if (params.rememberMe) {
            window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.accessToken,
            );
            window.localStorage.setItem(
              authConfig.onTokenExpiration,
              response.data.refreshToken,
            );
          }
          const returnUrl = searchParams.get("returnUrl");

          setUser({ ...response.data.user });
          if (params.rememberMe) {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user),
            );
          }

          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

          router.replace(redirectURL as string);
          closeModal();
        })

        .catch((err) => {
          setLoading(false);
          if (errorCallback) errorCallback(err);
        });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    window.localStorage.removeItem(authConfig.onTokenExpiration);
    router.push("/");
  };

  console.log("user", user);

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
