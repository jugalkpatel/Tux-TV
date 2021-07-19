const mongoose = require("mongoose");
const { Schema } = mongoose;

const savesSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: [true, "owner is required"],
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const Saves = mongoose.model("Saves", savesSchema);

module.exports = { Saves };
