const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//@desk Signup
//@route POST /api/user/signup
//@access Public
const signUp = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  if (password !== confirmPassword) {
    res.status(401);
    throw new Error("Confirm Password does not matched. Pls try again ");
  }
  // hashing the password
  const hasspass = await bcryptjs.hash(password, 7);
  const userAvailable = await User.findOne({ email });
  if (!userAvailable) {
    const createUser = await User.create({
      email,
      password: hasspass,
    });
    res.status(200).json({ message: `User Created `, createUser });
  } else {
    res.status(401);
    throw new Error("User is allready registered ");
  }
});
//@desk Login
//@route POST /api/user/login
//@access Public
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const searchUser = await User.findOne({ email });
  if (!searchUser) {
    res.status(404);
    throw new Error("You have not Registered. Please Register First");
  }
  if (searchUser && (await bcryptjs.compare(password, searchUser.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          useremail: searchUser.email,
          id: searchUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: accessToken });
  } else {
    res.status(404);
    throw new Error("PassWord is Incorrect");
  }
});
module.exports = {
  signUp,
  logIn,
};
