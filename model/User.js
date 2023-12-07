const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: [15, "name can't exceed 15 characters."],
    required: [true,"please provide name"],
  },
  email: {
    type: String,
    required: [true,"please provide email."],
    unique: true
  },
  password: {
    type: String,
    required: [true,"please provide password."],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;