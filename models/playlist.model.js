const mongoose = require("mongoose");
const { Schema } = mongoose;
const playlistSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "playlist title is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
