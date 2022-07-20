import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/index.js";
import { Login } from "../pages/index.js";
import { Signup } from "../pages/index.js";
import { Video } from "../pages/index.js";
import { Saves } from "../pages/index.js";
import { PlaylistsList } from "../pages/index.js";
import { Channel } from "../pages/index.js";
import { Modal } from "../components/VideoCard/Modal";
import { NotFound } from "../components/index.js";
import { Profile } from "../components/index.js";
import { Playlist } from "../components/index.js";
import { PrivateRoute } from "./PrivateRoute.js";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Home />}>
        <PrivateRoute path="/modal" element={<Modal />} />
      </Route>

      <Route path="/channel/:id" element={<Channel />}>
        <PrivateRoute path="/modal" element={<Modal />} />
      </Route>

      <Route path="/video/:title" element={<Video />}>
        <Route path="/modal" element={<Modal />} />
      </Route>

      <PrivateRoute path="/playlists" element={<PlaylistsList />} />

      <PrivateRoute path="/playlist/:title" element={<Playlist />} />

      <PrivateRoute path="/saves" element={<Saves />}>
        <PrivateRoute path="/modal" element={<Modal />} />
      </PrivateRoute>

      <PrivateRoute path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { Router };
