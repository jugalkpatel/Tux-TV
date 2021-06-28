const mongoose = require("mongoose");
const mongooseUniqueArray = require("mongoose-unique-array");
const { Schema } = mongoose;
require("mongoose-type-url");
const channelSchema = new Schema({
  title: {
    type: String,
    required: [true, "Channel name is required"],
    unique: true,
  },
  url: {
    type: mongoose.SchemaTypes.Url,
    required: [true, "channel url is required"],
  },
  snippet: {
    type: String,
    maxLength: 200,
  },
  thumbnail_src: {
    type: mongoose.SchemaTypes.Url,
    required: [true, "thumbnail is required"],
  },
  videos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Video",
      unique: true,
    },
  ],
});

channelSchema.plugin(mongooseUniqueArray);

const Channel = mongoose.model("Channel", channelSchema);

exports.Channel = Channel;
