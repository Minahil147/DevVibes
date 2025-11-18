const User = require("../models/User");

/**
 * Verify user email with validation token
 * @param {string} token - The validation token sent to user's email
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is required." });
    }

    // Find user with matching validation token
    const user = await User.findOne({
      validationToken: token,
      validationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Verification token is invalid or has expired. Please request a new verification email.",
      });
    }

    // Mark user as validated
    user.isValidated = true;
    user.validationToken = null;
    user.validationTokenExpiry = null;
    await user.save();

    res.status(200).json({
      message:
        "Email verified successfully. You can now log in to your account.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Resend verification email to user
 * @param {string} email - User's email address
 */
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if already verified
    if (user.isValidated) {
      return res
        .status(400)
        .json({ message: "User account is already verified." });
    }

    // Check if token still valid (not expired)
    if (user.validationTokenExpiry && user.validationTokenExpiry > new Date()) {
      return res.status(400).json({
        message:
          "A verification email was recently sent. Please check your email or try again in a few minutes.",
      });
    }

    // Generate new validation token
    const crypto = require("crypto");
    user.validationToken = crypto.randomBytes(32).toString("hex");
    user.validationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // TODO: Send new verification email
    // Example: sendVerificationEmail(user.email, user.validationToken);

    res.status(200).json({
      message: "Verification email has been resent. Please check your inbox.",
    });
  } catch (err) {
    console.error("Error resending verification email:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  verifyEmail,
  resendVerificationEmail,
};
