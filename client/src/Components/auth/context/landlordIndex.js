import React from "react";
import LandlordAuthProvider from "./LandlordAuthProvider";
import NotificationProvider from "./NotificationProvider";

export default function LandlordContextProviders({ children }) {
  return (
    <NotificationProvider>
      <LandlordAuthProvider>
        {children}
      </LandlordAuthProvider>
    </NotificationProvider>
  );
}
