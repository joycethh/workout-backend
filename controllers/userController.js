require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECREAT, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //search db to see if there is such user
    const existedUser = await User.findOne({ email });
    //user not existed
    if (!existedUser) {
      res.status(404).json({ mssg: `User doesn't exist` });
    }
    //user exist &&  then check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    //wrong password
    if (!isPasswordCorrect) {
      res.status(400).json({ mssg: "Invalid passwords" });
    }
    //correct password, then assign a token to the user
    const token = createToken(existedUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
