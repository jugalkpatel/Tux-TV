const { Channel } = require("../models/channel.model");
const addChannel = async (req, res) => {
  const { title, url, snippet, thumbnail, category } = req.body;

  const channel = new Channel({
    title: title,
    url: url,
    snippet: snippet,
    thumbnail_src: thumbnail,
    category: category,
  });

  await channel.save();

  res.status(201).json({
    success: true,
    message: "channel is added",
    channel,
  });
};

module.exports = { addChannel };
