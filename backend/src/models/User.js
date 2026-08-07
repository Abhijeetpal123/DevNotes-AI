const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    passWord: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Student", "Professional", "Freshers"],
      default: "Student",
    },
    githubUrl: {
      type: String,
      defaule: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
