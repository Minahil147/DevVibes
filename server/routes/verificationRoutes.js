const express = require("express");
const router = express.Router();
const {
  verifyEmail,
  resendVerificationEmail,
} = require("../controllers/verificationController");

// POST /api/verify-email - Verify user email with token
router.post("/verify-email", verifyEmail);

// POST /api/resend-verification - Resend verification email
router.post("/resend-verification", resendVerificationEmail);

module.exports = router;
