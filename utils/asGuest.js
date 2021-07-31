const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { Saves } = require("../models/saves.model");
const { Playlist } = require("../models/playlist.model");
const asGuest = async (email) => {
  console.log("asGuest called");
  try {
    const user = await User.findOneAndUpdate({ email }, { playlists: [] });

    await Saves.findOneAndUpdate(
      {
        owner: user._id,
      },
      {
        videos: [],
      }
    );

    await Playlist.deleteMany({
      owner: user._id,
    });
  } catch {
    console.error("error while creating guest....");
  }
};

module.exports = { asGuest };
