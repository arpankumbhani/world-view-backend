const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

exports.signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error hashing password",
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Remove sensitive information before sending the response
    const userdata = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      token,
      user: userdata,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Error: cannot register user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the details carefully",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          _id: user.id,
          //   role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      //   // Send email upon successful login
      //   const subject = "Successful Login";
      //   const text = `Hello ${user.username},\n\nYou have successfully logged in.`;

      // sendEmail(user.email, subject, text);

      // Remove sensitive information before sending the response
      user.password = undefined;

      res.status(200).json({
        success: true,
        token,
        user,
        message: "User login successful",
      });
    } else {
      // Password not match
      return res.status(403).json({
        success: false,
        message: "Password does not match, please try again",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
