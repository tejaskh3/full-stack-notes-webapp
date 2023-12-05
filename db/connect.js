const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the data base.");
  } catch (error) {
    console.log("error connecting in data base", { err: error.message });
  }
};
module.exports = connectDB;