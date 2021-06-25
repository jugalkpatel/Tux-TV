const mongoose = require("mongoose");
const mongooseUniqueArray = require("mongoose-unique-array");
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
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
        unique: true,
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

playlistSchema.plugin(mongooseUniqueArray);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
