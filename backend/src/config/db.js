const mongoose = require("mongoose");
const { error } = require("node:console");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (err) {
    console.error("Database is not Succesfully Connected", err.message);
  }
};
module.exports = connectDB;
