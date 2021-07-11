const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw createError.Unauthorized("Empty token");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (req.user.name !== decoded.uname) {
    throw createError.Unauthorized("Invalid token");
  }

  next();
};

module.exports = { tokenValidator };
