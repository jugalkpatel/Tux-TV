const mongoose = require("mongoose");
const mongooseUniqueArray = require("mongoose-unique-array");
const { Schema } = mongoose;
require("mongoose-type-url");
const channelSchema = new Schema(
  {
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
      maxLength: 500,
    },
    thumbnail_src: {
      type: mongoose.SchemaTypes.Url,
      required: [true, "thumbnail is required"],
    },
    category: {
      type: [String],
      require: [true, "Category is required"],
      maxLength: 10,
    },
    videos: [
      {
        type: mongoose.SchemaTypes.ObjectId,
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

channelSchema.plugin(mongooseUniqueArray);

const Channel = mongoose.model("Channel", channelSchema);

exports.Channel = Channel;
