import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "../../lib/connector";
import { useRouter } from "next/router";
import { accountLogin, getAccount, getAccountMe } from "../../lib/api/account";
import { GENERAL_ERROR } from "../../utils/constants";
import LoadingScreen from "../../components/molecules/LoadingScreen/LoadingScreen.molecule";
import { isEmpty } from "lodash";

const whitelist = ["/", "/aviso-legal", "/politica-privacidad"]

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      const roleCode = Cookies.get("roleCode");

      if (token && roleCode) {
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const { data: dataAccountMe } = await getAccountMe(roleCode);

          const { data: dataAccount, error: errorAccount } = await getAccount(
            roleCode,
            dataAccountMe.UserId
          );

          if (errorAccount) return console.error(errorAccount);

          setUser({ ...dataAccount, roleCode: Number(roleCode) });
        } catch (e) {
          console.error(e);
        }
      }

      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ nif, passwordHash }, roleCode = 3) => {
    const response = await accountLogin(roleCode, {
      Account: { NIF: nif, passwordHash },
    });

    if (!response) return { error: GENERAL_ERROR };

    const { data: dataLogin, error: errorLogin } = response;

    if (errorLogin) return { error: errorLogin };

    const { Token, UserId } = dataLogin;
    Cookies.set("token", Token, { expires: 60 });
    Cookies.set("roleCode", roleCode, { expires: 60 });
    axiosInstance.defaults.headers.Authorization = `Bearer ${Token}`;

    const { data: dataAccount, error: errorAccount } = await getAccount(
      roleCode,
      UserId
    );

    if (errorAccount) return { error: errorAccount };
    setUser({ ...dataAccount, roleCode });
    return { data: dataAccount };
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("roleCode");
    setUser(null);
    delete axiosInstance.defaults.headers.Authorization;
    window.location.pathname = "/login-cliente";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading: loading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (whitelist.includes(router.pathname)) return children;
  if (isLoading) return <LoadingScreen />;
  else {
    if (router.pathname === "/alta" && isEmpty(router.query)) {
      router.push("/tarifas");
      return <LoadingScreen />;
    } else if (!router.pathname?.includes("/tarifas")) {
      if (!isAuthenticated && router.pathname == "/global") {
        Cookies.remove("token");
        Cookies.remove("roleCode");
        router.push("/login-cliente");
        return <LoadingScreen />;
      }
      if (
        !isAuthenticated &&
        !router.pathname?.includes("/login") &&
        !router.pathname == "/pass-enviar-recuperar"
      ) {
        Cookies.remove("token");
        Cookies.remove("roleCode");
        router.push("/login-cliente");
        return <LoadingScreen />;
      }
      if (
        (isAuthenticated && router.pathname?.includes("/login")) ||
        router.pathname == "/"
      ) {
        router.push("/global");
        return <LoadingScreen />;
      }
    }

    return children;
  }
};

export const useAuth = () => useContext(AuthContext);
