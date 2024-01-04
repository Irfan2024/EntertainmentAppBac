const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controller/userController");
router.route("/signUp").post(signUp);
router.route("/logIn").post(logIn);
module.exports = router;
