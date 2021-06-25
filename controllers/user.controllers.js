const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");

const isUserExists = async (req, res, next, id) => {
  console.log("is user exists");
  try {
    const user = await User.findById(id);

    if (!user) {
      throw createError(404, "User not exists");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: "user created successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log({ email, password });

  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw createError(404, "email or password is invalid");
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw createError(401, "email or password is invalid");
  }

  const token = jwt.sign({ uname: user.name }, process.env.SECRET_KEY, {
    expiresIn: "72h",
  });

  res.status(201).json({
    succes: true,
    message: "user is authenticated successfully",
    token,
    id: user._id,
  });
};

module.exports = { register, login, isUserExists };
