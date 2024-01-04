const mongoose = require("mongoose");
const bookmarkSchema = mongoose.Schema({
  user_Email: {
    type: String,
    required: true,
  },
  content: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("bookmarks", bookmarkSchema);
