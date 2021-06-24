const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    lowercase: true,
    minLength: [3, "Username should be atleast three characters"],
    validate: [
      validator.isAlphanumeric,
      "Username only have letters and numbers",
    ],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    validate: [validator.isEmail, "Enter Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "Password should be atleast eight characters"],
  },
  playlists: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
  },
  saved: {
    type: Schema.Types.ObjectId,
    ref: "Saved",
  },
});

userSchema.index({ name: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
