const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const videoSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      maxLength: 100,
    },
    url: {
      type: mongoose.SchemaTypes.Url,
      require: [true, "Video url is required"],
    },
    snippet: {
      type: String,
      maxLength: 500,
    },
    thumbnail_src: {
      type: mongoose.SchemaTypes.Url,
      require: [true, "thumbnail is required"],
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

const Video = mongoose.model("Video", videoSchema);

exports.Video = Video;
