require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECREAT, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  //get the req data
  const { email, password } = req.body;
  //user exist, create token --- send token
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.signup(email, password);
    const token = createToken(newUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
