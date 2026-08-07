// Register User

// 1 Read the data from req.body
// 2 validate input
// 3 check existing user
// 4 Generate Hash pw
// 5  save user
// 6  generate jwt
// 7 return response
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const registerUser = async (req, res) => {
  try {
    const { userName, email, passWord, role } = req.body;
    if (!userName || !email || !passWord) {
      return res.status(400).json({ message: "Error" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists with this email ",
      });
    }
    const hashedPassword = await bcrypt.hash(passWord, 10);

    const newUser = await User.create({
      userName,
      email,
      passWord: hashedPassword,
      role,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    if (!email || !passWord) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are Required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        succcess: false,
        message: "User not Found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(passWord, user.passWord);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or Password",
      });
    }

    const token = generateToken(user._id);

    return res.status(400).json({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,  
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login not Successfull",
    });
  }
};

module.exports = { registerUser,loginUser };
