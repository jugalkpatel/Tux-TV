const { Playlist } = require("../models/playlist.model");

const create = async (req, res) => {
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
  const user = req.user;
  const playlist = await Playlist.findOne({ _id: playlistID, owner: user._id });

  await playlist.videos.push(videoID);
  await playlist.save();

  await Playlist.populate(playlist, {
    path: "videos channel",
    select: "-__v",
  });

  res.status(201).json({
    success: true,
    message: "video added successfully",
    playlist,
  });
};

module.exports = { create, addVideo };
