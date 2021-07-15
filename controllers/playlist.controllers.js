const { Playlist } = require("../models/playlist.model");

const mongoose = require("mongoose");

const createPlaylist = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  const playlist = new Playlist({
    title: title,
    owner: user._id,
  });

  await playlist.save();

  await user.playlists.push(playlist);
  await user.save();

  const response = res.status(201).json({
    success: true,
    message: "Playlist created successfully",
    playlist,
  });
};

const addVideo = async (req, res) => {
  const { id: videoID } = req.body;
  const { playlistID } = req.params;
  console.log(videoID, playlistID);
  const user = req.user;
  const playlist = await Playlist.findOne({ _id: playlistID, owner: user._id });

  await playlist.videos.push(videoID);
  await playlist.save();

  await Playlist.populate(playlist, {
    path: "videos",
    select: "-__v",
    populate: {
      path: "channel",
      select: "-__v -videos",
    },
  });

  res.status(201).json({
    success: true,
    message: "video added successfully",
    details: {
      playlist: playlist.id,
      video: playlist.videos.slice(-1)[0],
    },
  });
};

const removeVideo = async (req, res) => {
  const { id: videoID } = req.body;
  const { playlistID } = req.params;

  const playlist = await Playlist.findByIdAndUpdate(playlistID, {
    $pull: { videos: videoID },
  });

  res.status(201).json({
    success: true,
    message: "video successfully removed",
    details: { playlist: playlist.id, video: videoID },
  });
};

const getPlaylists = async (req, res, next) => {
  const user = req.user;

  if (!user.playlists.length) {
    res.status(204).send("there are no playlists");
    return;
  }

  const playlists = await Playlist.find({ owner: user._id });

  await Playlist.populate(playlists, {
    path: "videos",
    select: "-__v",
    populate: {
      path: "channel",
      select: "-__v -videos",
    },
  });

  res.status(200).json({
    sucess: true,
    playlists,
  });
};

module.exports = { createPlaylist, addVideo, removeVideo, getPlaylists };
