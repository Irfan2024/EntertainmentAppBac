const express = require("express");
const validateToken = require("../middleware/validateHandlerToken");
const router = express.Router();
const {
  getTrending,
  getMovies,
  gettvSeries,
  getbookmark,
  search,
  addBookmark,
  deletebookmark,
} = require("../controller/contentController");
router.use(validateToken);
router.route("/movies").get(getMovies);
router.route("/tvSeries").get(gettvSeries);
router.route("/bookmark").get(getbookmark);
router.route("/getTrending").get(getTrending);
router.route("/search/:key").post(search);
router.route("/bookmark/:id").post(addBookmark).delete(deletebookmark);
module.exports = router;
