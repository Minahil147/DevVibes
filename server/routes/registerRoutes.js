const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController");
const { validateRegister } = require("../validators/registerValidator");

router.route("/").post(validateRegister, registerUser);

module.exports = router;
