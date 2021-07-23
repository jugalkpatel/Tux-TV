const express = require("express");

const app = express();
const cors = require("cors");
const createError = require("http-errors");

const { getConnection } = require("./services/mongoose.connection");
const { videoRouter } = require("./routes/video.route");
const { channelRouter } = require("./routes/channel.route");
const { userRouter } = require("./routes/user.route");
const { errorHandler } = require("./middlewares/error-handler");

require("dotenv").config();

getConnection();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "welcome to the backend for video-library app",
  });
});

app.use("/user", userRouter);
app.use("/videos", videoRouter);
app.use("/channels", channelRouter);

/* 404 ROUTE: Don't move */
app.use((req, res, next) => {
  next(createError(404, `${req.url} no such endpoint`));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
