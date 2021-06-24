const createError = require("http-errors");

const { Video } = require("../models/video.model");

const getAllVideos = async (req, res) => {
  const videos = await Video.aggregate([
    { $addFields: { id: "$_id" } },
    { $project: { _id: 0, __v: 0 } },
  ]);

  if (!videos) {
    throw createError(404, "videos not found");
  }

  res.status(200).json({
    success: true,
    videos,
  });
};

const addVideo = async (req, res) => {
  const {
    video: {
      title,
      url,
      duration,
      upload_date,
      thumbnail_src,
      views,
      category,
      likes,
      dislikes,
    },
    channel: channelId,
  } = req.body;

  const channel = await Channel.findById(channelId).exec();

  const video = new Video({
    title,
    url,
    duration,
    upload_date,
    thumbnail_src,
    views,
    category,
    likes,
    dislikes,
    channel: mongoose.Types.ObjectId(channelId),
  });

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

  console.log({ snippet, id });

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
