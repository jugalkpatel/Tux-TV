const createError = require("http-errors");

const { Video } = require("../models/video.model");
const { Channel } = require("../models/channel.model");

const mongoose = require("mongoose");

const getAllVideos = async (req, res) => {
  const videos = await Video.find({});

  if (!videos) {
    throw createError(404, "videos not found");
  }

  await Video.populate(videos, {
    path: "channel",
    select: "title url id thumbnail_src",
  });

  res.status(200).json({
    success: true,
    videos,
  });
};

const addVideo = async (req, res) => {
  const { title, url, snippet, thumbnail, channelId, category } = req.body;

  const channel = await Channel.findById(channelId).exec();

  const video = new Video({
    title,
    url,
    snippet,
    thumbnail_src: thumbnail,
    category,
    channel: mongoose.Types.ObjectId(channelId),
  });
  //
  await channel.videos.push(video);

  await video.save();
  await channel.save();

  res.status(201).json({
    success: true,
    message: "video added successfully",
    data: video,
  });
};

const addSnippet = async (req, res) => {
  const { snippet, id } = req.body;

  const video = await Video.findById(id);

  video.snippet = snippet;

  await video.save();

  res.status(201).json({
    success: true,
    messsage: "video snippet updated successfully",
    video: video,
  });
};

module.exports = { getAllVideos, addVideo, addSnippet };
