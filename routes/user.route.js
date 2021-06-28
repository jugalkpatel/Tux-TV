const express = require("express");
const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const {
  register,
  login,
  isUserExists,
} = require("../controllers/user.controllers");
const {
  create,
  addVideo,
  removeVideo,
  getPlaylists,
} = require("../controllers/playlist.controllers");
const { playlistRouter } = require("./playlists.route");
const { savedRouter } = require("./saved.route");

userRouter.post("/register", asyncHandler(register));

userRouter.post("/login", asyncHandler(login));

// check if user exists
userRouter.param("userID", asyncHandler(isUserExists));

userRouter.use("/:userID/playlists", playlistRouter);

userRouter.use("/:userID/saved", savedRouter);

module.exports = { userRouter };
