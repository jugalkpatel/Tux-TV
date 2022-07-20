import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useSetupAuth } from "../../hooks/useSetupAuth";

import { useToast } from "../ToastContext/ToastProvider";
import { authReducer } from "./authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setupToast } = useToast();

  const initialData = {
    userID: "",
    token: "",
    name: "",
    isLoggedIn: false,
  };

  const [userData, dispatchUserData] = useReducer(authReducer, initialData);
  const stableSetupAuth = useRef(useSetupAuth(dispatchUserData));
  const stableSetupToast = useRef(setupToast);

  useEffect(() => {
    const setupAuth = stableSetupAuth.current;
    const setupToast = stableSetupToast.current;

    const { token, id, name } = JSON.parse(localStorage?.getItem("ttv")) || {
      token: "",
      id: "",
      name: "",
    };

    if (token && id && name) {
      setupAuth({ token, id, name, path: "/", data: null });
    } else {
      setupToast("You're not logged in....");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...userData,
        dispatchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
