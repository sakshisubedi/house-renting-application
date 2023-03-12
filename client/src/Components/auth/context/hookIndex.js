import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
// import { LandlordAuthContext } from "./LandlordAuthProvider";
import { NotificationContext } from "./NotificationProvider";
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
// export const useLandlordAuth = () => useContext(LandlordAuthContext);