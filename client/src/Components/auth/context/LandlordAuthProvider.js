import React, { createContext, useEffect, useState } from "react";
import { getIsAuthLandlord, signInLandlord } from "../auth"
import { useNotification } from "./hookIndex";

export const LandlordAuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function LandlordAuthProvider({ children }) {
  const [landlordInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const handleLoginLandlord = async (email, password) => {
    setAuthInfo({ ...landlordInfo, isPending: true });
    const { error, user } = await signInLandlord({ email, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...landlordInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };

  const isAuthLandlord = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    // setAuthInfo({ ...landlordInfo, isPending: true });
    // const { error, user } = await getIsAuthLandlord(token);
    // if (error) {
    //   updateNotification("error", error);
    //   return setAuthInfo({ ...landlordInfo, isPending: false, error });
    // }

    // setAuthInfo({
    //   profile: { ...user },
    //   isLoggedIn: true,
    //   isPending: false,
    //   error: "",
    // });
  };

  const handleLogoutLandlord = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuthLandlord();
  }, []);

  //  handleLogout
  return (
    <LandlordAuthContext.Provider
      value={{ landlordInfo, handleLoginLandlord, handleLogoutLandlord, isAuthLandlord }}
    >
      {children}
    </LandlordAuthContext.Provider>
  );
}
