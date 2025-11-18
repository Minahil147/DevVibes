require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    console.log("login function");
    const { login, password, persist } = req.body;

    // Validate input
    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Email/Username and Password are required." });
    }

    // Find user by email or username
    const foundUser = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!foundUser.password) {
      return res.status(500).json({ message: "User has no password set" });
    }

    // Compare password safely
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Prepare payload for JWT
    const payload = {
      id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    };

    // Generate access token (short-lived)
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60m",
    });

    // Generate refresh token (longer if persist)
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: persist ? "15d" : "60m",
    });

    // Save refresh token in DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Set httpOnly cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: persist ? 15 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    // Remove password before sending user data
    const { password: _, ...userData } = foundUser.toObject();

    // Send response
    res.json({
      message: `Welcome back, ${userData.firstName}!`,
      user: userData,
      accessToken,
    });
  } catch (err) {
    debugger;
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { loginUser };
