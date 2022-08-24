const mongoose = require("mongoose");
const getConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("successfully connected to the database");
  } catch (error) {
    console.log("error while connecting to db", error);
  }
};

exports.getConnection = getConnection;
