const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

//static method
userSchema.statics.signup = async function (email, password) {
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw Error("Email is already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashPassword });

  return user;
};
module.exports = mongoose.model("User", userSchema);
