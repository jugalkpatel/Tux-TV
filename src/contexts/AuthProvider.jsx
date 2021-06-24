import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupAuthHeaderForServiceCalls } from "../utils/setupHeader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const setupAuth = (id, token, path, details) => {
    setUserID(id);
    setToken(token);
    setupAuthHeaderForServiceCalls(token);
    navigate(path, { state: { details } });
  };

  const handleAPICalls = (callback, payload) => {
    if (token) {
      callback(...payload);
      return;
    }
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ userID, token, setUserID, setToken, setupAuth, handleAPICalls }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
