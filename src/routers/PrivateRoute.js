import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
const PrivateRoute = ({ path, ...props }) => {
  const { token } = useAuth();
  const { state } = useLocation();
  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: path || "/", details: state.data }}
    />
  );
};

export { PrivateRoute };
