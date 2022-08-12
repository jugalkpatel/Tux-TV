import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useSetupAuth } from "../../hooks/useSetupAuth";

import { authReducer } from "./authReducer";
import { useToast } from "../../contexts";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const initialData = {
    userID: "",
    token: "",
    name: "",
    isLoggedIn: false,
  };

  const [userData, dispatchUserData] = useReducer(authReducer, initialData);
  const stableSetupAuth = useRef(useSetupAuth(dispatchUserData));

  useEffect(() => {
    const setupAuth = stableSetupAuth.current;

    const { token, id, name } = JSON.parse(localStorage?.getItem("ttv")) || {
      token: "",
      id: "",
      name: "",
    };

    if (token && id && name) {
      setupAuth({ token, id, name, path: "/", data: null });
    } else {
      // addToast("You're not logged in....", "error");
    }
  }, [addToast]);

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
