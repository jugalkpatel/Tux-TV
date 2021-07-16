const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");

const isUserExists = async (req, res, next, id) => {
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

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign({ uname: user.name }, process.env.SECRET_KEY, {
    expiresIn: "72h",
  });

  res.status(201).json({
    success: true,
    message: "user created successfully",
    credentials: { token, id: user._id, name: user.name },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  console.log(user);

  if (!user) {
    throw createError.NotFound("User not registered");
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw createError(403, "Invalid email ID or Password");
  }

  const token = jwt.sign({ uname: user.name }, process.env.SECRET_KEY, {
    expiresIn: "72h",
  });

  res.status(201).json({
    succes: true,
    message: "user is authenticated successfully",
    token,
    id: user._id,
    name: user.name,
  });
};

module.exports = { register, login, isUserExists };
