const express = require("express");

const asyncHandler = require("express-async-handler");

const channelRouter = express.Router();

const { Channel } = require("../models/channel.model");
const { addChannel } = require("../controllers/channels.controllers");

channelRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const channels = await Channel.find({});

      await Channel.populate(channels, {
        path: "videos",
        populate: {
          path: "channel",
          select: "id title url thumbnail_src",
        },
      });

      if (!channels.length) {
        res.status(404).json({
          suceess: false,
          message: "There are no channels",
          channel: channels,
        });

        return;
      }

      res.status(200).json({
        success: true,
        message: "Channels fetched successfully",
        channels,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error occured while fetching channels",
        error,
      });
    }
  })
  .post(asyncHandler(addChannel));

exports.channelRouter = channelRouter;
