const express = require("express");
const asyncHandler = require("express-async-handler");
const savedRouter = express.Router();

const { tokenValidator } = require("../middlewares/token-validator");

const {
  getSaves,
  addVideo,
  removeVideo,
} = require("../controllers/saved.controllers");

savedRouter.use(asyncHandler(tokenValidator));

savedRouter.get("/", asyncHandler(getSaves));

savedRouter.post("/add", asyncHandler(addVideo));

savedRouter.post("/remove", asyncHandler(removeVideo));

// /add
// /remove

module.exports = { savedRouter };
