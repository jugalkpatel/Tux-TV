const mongoose = require("mongoose");
const getConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://jimmy:${process.env.DB_PASS}@cluster0.tpjk1.mongodb.net/video-library?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("successfully connected to the database");
  } catch (error) {
    console.log("error while connecting to db", error);
  }
};

exports.getConnection = getConnection;
