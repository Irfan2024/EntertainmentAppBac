const asyncHandler = require("express-async-handler");
const bookmark = require("../model/bookmarkModel");
const allContent = require("../model/allContent");
//@desk GET all movies
//@route Get /api/trending
//@access Private
const getTrending = asyncHandler(async (req, res) => {
  try {
    const movies = await allContent
      .find({ movie_id: { $exists: true } })
      .limit(10);
    const tvSeries = await allContent
      .find({ TvSeries_id: { $exists: true } })
      .limit(10);
    const trendingVideos = [...movies, ...tvSeries];
    res.status(200).json(trendingVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trending videos" });
  }
});
//@desk GET all movies
//@route Get /api/movies
//@access Private
const getMovies = asyncHandler(async (req, res) => {
  const allMovies = await allContent.find({ movie_id: { $exists: true } });
  res.status(200).json(allMovies);
});
//@desk GET all tvSeries
//@route Get /api/tvSeries
//@access Private
const gettvSeries = asyncHandler(async (req, res) => {
  const alltvSeries = await allContent.find({ TvSeries_id: { $exists: true } });
  res.status(200).json(alltvSeries);
});
//@desk Add bookmark
//@route POST /api/bookmark/:id
//@access Private
const addBookmark = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const userEmail = req.user.useremail;
  // console.error("This is useremailBookmark", userEmail);
  try {
    // Check if the user exists in bookmarks
    let existingBookmarkUser = await bookmark.findOne({
      user_Email: userEmail,
    });
    if (!existingBookmarkUser) {
      existingBookmarkUser = await bookmark.create({
        user_Email: userEmail,
        content: [itemId],
      });
      return res.status(200).json(existingBookmarkUser);
    }
    const itemIndex = existingBookmarkUser.content.indexOf(itemId);
    if (itemIndex !== -1) {
      existingBookmarkUser.content.splice(itemIndex, 1);
      await existingBookmarkUser.save();
      return res.status(200).json(existingBookmarkUser);
    }
    existingBookmarkUser.content.push(itemId);
    await existingBookmarkUser.save();
    res.status(200).json(existingBookmarkUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bookmark creation failed" });
  }
});
//@desk GET all bookmark
//@route Get /api/bookmark
//@access Private
const getbookmark = asyncHandler(async (req, res) => {
  const bookmarkData = await bookmark
    .findOne({ user_Email: req.user.useremail })
    .select("content");
  if (!bookmarkData || bookmarkData.content.length === 0) {
    return res
      .status(400)
      .json({ message: "You have not bookmarked any item" });
  }
  const contentIds = bookmarkData.content;
  const allContentsData = await allContent.find({ _id: { $in: contentIds } });
  if (!allContentsData || allContentsData.length === 0) {
    return res
      .status(404)
      .json({ message: "No matching items found in allcontents" });
  }
  res.status(200).json(allContentsData);
});
//@desk Delete bookmark
//@route DELETE /api/:id
//@access Private
const deletebookmark = asyncHandler(async (req, res) => {
  const itemIdToDelete = req.params.id; // Item ID to delete
  const userEmail = req.user.useremail; // User ID
  try {
    // Finding the user's bookmark entry
    const existingBookmarkUser = await bookmark.findOne({
      user_Email: userEmail,
    });
    if (!existingBookmarkUser) {
      return res.status(404).json({ error: "User's bookmark entry not found" });
    }
    // Checking if the item exists in the user's bookmarks
    if (!existingBookmarkUser.content.includes(itemIdToDelete)) {
      return res.status(404).json({ error: "Item not found in bookmarks" });
    }
    // Remove the item from the user's bookmarks
    existingBookmarkUser.content = existingBookmarkUser.content.filter(
      (item) => item !== itemIdToDelete
    );
    await existingBookmarkUser.save();
    res.status(200).json(existingBookmarkUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bookmark deletion failed" });
  }
});
//@desk GET all search
//@route POST /api/search/:key
//@access Private
const search = asyncHandler(async (req, res) => {
  let result = await allContent.find({
    $or: [
      {
        title: { $regex: req.params.key },
      },
      {
        name: { $regex: req.params.key },
      },
    ],
  });
  res.status(200).json({ message: result });
});
module.exports = {
  getTrending,
  getMovies,
  gettvSeries,
  getbookmark,
  search,
  addBookmark,
  deletebookmark,
};
