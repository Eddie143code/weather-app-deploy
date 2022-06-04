const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  // destructure details from request body
  const { name, email, password } = req.body;

  // Check if all fields had input and if not throw error
  if (!name || !email || !password) {
    res.status(400);
    res.status(400);
    res.json();
  }

  // Find if email already exists in database
  const userExists = await User.findOne({ email });

  // If user exists throw error
  if (userExists) {
    res.status(400);
    res.status(400);
    res.json();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json();
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    res.json();
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.status(400);
    res.json();
  }
};

module.exports = {
  register,
  login,
};
