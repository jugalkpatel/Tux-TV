const express = require("express");

const asyncHandler = require("express-async-handler");
const videoRouter = express.Router();
const {
  getAllVideos,
  addVideo,
  addSnippet,
} = require("../controllers/video.controllers");

videoRouter
  .route("/")
  .get(asyncHandler(getAllVideos))
  .post(asyncHandler(addVideo));

videoRouter.route("/snippet").post(asyncHandler(addSnippet));

module.exports = { videoRouter };
