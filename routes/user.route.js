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
} = require("../controllers/playlist.controllers");

userRouter.route("/register").post(asyncHandler(register));

userRouter.route("/login").post(asyncHandler(login));

userRouter.param("userID", asyncHandler(isUserExists));

userRouter.route("/:userID/playlists/create").post(asyncHandler(create));

userRouter
  .route("/:userID/playlists/:playlistID/add")
  .post(asyncHandler(addVideo));

userRouter
  .route("/:userID/playlists/:playlistID/remove")
  .post(asyncHandler(removeVideo));

userRouter.route("/:userID/saved").get(async (req, res, next) => {
  console.log("Hello, I'm playlist route");
});

module.exports = { userRouter };
