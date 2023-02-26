import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { NotificationContext } from "./NotificationProvider";
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
