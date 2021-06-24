const express = require("express");

const asyncHandler = require("express-async-handler");

const userRouter = express.Router();

const {
  register,
  login,
  isUserExists,
} = require("../controllers/user.controllers");

userRouter.route("/register").post(asyncHandler(register));

userRouter.route("/login").post(asyncHandler(login));

userRouter.param("userID", asyncHandler(isUserExists));

userRouter.route("/:userID/playlists").get(async (req, res, next) => {
  console.log("hello, I'm playlist route");
});

userRouter.route("/:userID/saved").get(async (req, res, next) => {
  console.log("Hello, I'm playlist route");
});

module.exports = { userRouter };
