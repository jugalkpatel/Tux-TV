const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const videoSchema = new Schema({
  title: {
    type: String,
    require: [true, "Title is required"],
    maxLength: 100,
  },
  url: {
    type: mongoose.SchemaTypes.Url,
    require: [true, "Video url is required"],
  },
  duration: {
    type: String,
    require: [true, "Duration is required"],
    maxLength: 17,
  },
  snippet: {
    type: String,
    maxLength: 500,
  },
  upload_date: {
    type: String,
    require: [true, "Upload date is required"],
  },
  thumbnail_src: {
    type: mongoose.SchemaTypes.Url,
    require: [true, "thumbnail is required"],
  },
  views: {
    type: String,
    require: [true, "views are required"],
  },
  likes: {
    type: Number,
    require: [true, "likes are required"],
  },
  dislikes: {
    type: Number,
    require: [true, "dislikes are required"],
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
  },
  category: {
    type: [String],
    require: [true, "Category is required"],
    maxLength: 10,
  },
});

const Video = mongoose.model("Video", videoSchema);

exports.Video = Video;
