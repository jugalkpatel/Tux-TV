const express = require("express");

const channelRouter = express.Router();

const { Channel } = require("../models/channel.model");

channelRouter
  .route("/")
  .get(async (req, res) => {
    try {
      // const channels = await Channel.find({});

      const channels = await Channel.aggregate([
        { $addFields: { channelID: "$_id" } },
        { $project: { _id: 0, __v: 0 } },
      ]);

      console.log(channels);

      if (channels.length <= 0) {
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
      // logging error
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error occured while fetching channels",
        error,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, url, snippet, thumbnail_src } = req.body;

      const channel = new Channel({
        title: title,
        url: url,
        snippet: snippet,
        thumbnail_src: thumbnail_src,
      });

      await channel.save();

      res.status(201).json({
        success: true,
        message: "channel is added",
        channel,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while creating channel",
        error,
      });
    }
  });

exports.channelRouter = channelRouter;
