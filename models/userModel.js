const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static login method
userSchema.statics.login = async function (email, password) {
  //validate
  if (!email || !password) {
    throw Error("All fields needs to be filled");
  }

  //search db to see if there is such user
  const user = await User.findOne({ email });
  //a. user not existed
  if (!user) {
    throw Error(`User doesn't exist`);
  }
  //b. user exist &&  then check password
  const isMatch = await bcrypt.compare(password, user.password);
  //b.1 password not match
  if (!isMatch) {
    throw Error("Invalide Credentials");
  }

  return user;
};

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validate
  if (!email || !password) {
    throw Error("All fields needs to be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //check if the user exist
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw Error("Email is already in use");
  }

  //create new user
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
