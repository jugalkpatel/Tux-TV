import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";

const PrivateRoute = ({ path, ...props }) => {
  const { token, userID } = useAuth();
  const { state } = useLocation();
  return token && userID ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: path || "/", data: state?.data ? state.data : null }}
    />
  );
};

export { PrivateRoute };
