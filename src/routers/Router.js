import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home.jsx";
import { Modal } from "../components/VideoCard/Modal";
import { Login } from "../pages/Login/Login";
import { Signup } from "../pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute.js";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <PrivateRoute path="/modal/" element={<Modal />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export { Router };
