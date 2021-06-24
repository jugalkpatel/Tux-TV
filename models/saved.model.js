const mongoose = require("mongoose");

const { Schema } = mongoose;

const savedSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "owner name is required"],
  },
  vidoes: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, "video is required"],
    },
  ],
});

const Saved = mongoose.model("Saved", savedSchema);
exports.Saved = Saved;
