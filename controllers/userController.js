const User = require("../models/userModel");

//login user
const loginUser = async (req, res) => {
  res.json({ mssg: "sign in users" });
};

const signupUser = async (req, res) => {
  res.json({ mssg: "sign up users" });
};

module.exports = { loginUser, signupUser };
