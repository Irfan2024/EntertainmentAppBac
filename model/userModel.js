const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please enter you email address"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please enter you email address"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
