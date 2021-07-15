const express = require("express");
const asyncHandler = require("express-async-handler");
const playlistRouter = express.Router();

const {
  createPlaylist,
  removePlaylist,
  addVideo,
  removeVideo,
  getPlaylists,
} = require("../controllers/playlist.controllers");
const { tokenValidator } = require("../middlewares/token-validator");

playlistRouter.use(asyncHandler(tokenValidator));

playlistRouter.get("/", asyncHandler(getPlaylists));

playlistRouter.post("/create", asyncHandler(createPlaylist));

playlistRouter.post("/remove", asyncHandler(removePlaylist));

playlistRouter.post("/:playlistID/add", asyncHandler(addVideo));

playlistRouter.post("/:playlistID/remove", asyncHandler(removeVideo));

module.exports = { playlistRouter };
