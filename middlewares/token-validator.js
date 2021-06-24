const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (req.user.name !== decoded.uname) {
    throw createError(401, "unauthorized user");
  }

  console.log("in token validator");

  next();
};

module.exports = { tokenValidator };
