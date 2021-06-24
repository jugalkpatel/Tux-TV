const mongoose = require("mongoose");

const { Schema } = mongoose;

const playlistSchema = new Schema({
  title: {
    type: String,
    require: [true, "playlist title is required"],
  },
  owner: {
    type: Schema.types.ObjectId,
    ref: "User",
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      unique: true,
    },
  ],
});

const Playlist = mogoose.model("Playlist", playlistSchema);

exports.Playlist = Playlist;
