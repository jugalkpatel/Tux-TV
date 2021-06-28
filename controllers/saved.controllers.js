const { Saves } = require("../models/saves.model");
const getSaves = async (req, res) => {
  const user = req.user;

  if (!user.saved) {
    res.status(204).send("saved is empty");
    return;
  }

  const saves = await Saves.findById(user.saves);

  await Saves.populate(saves, {
    path: "videos",
    select: "-__v",
    populate: {
      path: "channel",
      select: "-__v -videos",
    },
  });

  res.status(200).json({
    success: true,
    saves,
  });
};

const addVideo = async (req, res) => {
  const user = req.user;
  const { id: videoID } = req.body;

  if (!user.saves) {
    const saves = new Saves({
      owner: user._id,
      videos: [videoID],
    });

    await saves.save();

    user.saves = saves;
    await user.save();

    await Saves.populate(saves, {
      path: "videos",
      select: "-__v",
      populate: {
        path: "channel",
        select: "-__v -videos",
      },
    });

    res.status(201).json({
      success: true,
      message: "video added successfully",
      saves,
    });

    return;
  }

  const saves = await Saves.findById(user.saves);

  await saves.videos.push(videoID);
  await saves.save();

  await Saves.populate(saves, {
    path: "videos",
    select: "-__v",
    populate: {
      path: "channel",
      select: "-__v -videos",
    },
  });

  res.status(201).json({
    success: true,
    message: "video add successfully",
    saves,
  });
};

const removeVideo = async (req, res) => {
  const user = req.user;
  const { id: videoID } = req.body;

  const removedVideo = await Saves.findByIdAndUpdate(user.saves, {
    $pull: { videos: videoID },
  });

  res.status(201).json({
    success: true,
    message: "video successfully removed",
    video: videoID,
  });
};

module.exports = { getSaves, addVideo, removeVideo };
