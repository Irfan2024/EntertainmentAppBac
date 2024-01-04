const mongoose = require("mongoose");
const allContentSchema = mongoose.Schema({
  Sr: {
    type: Number,
  },
  movie_id: {
    type: Number,
  },
  TvSeries_id: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  release_date: {
    type: String,
  },
  genres: {
    type: Array,
  },
  backdrop_path: {
    type: String,
  },

  poster_path: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  original_title: {
    type: String,
  },
  original_name: {
    type: String,
  },
  first_air_date: {
    type: String,
  },
  last_air_date: {
    type: String,
  },
  synopsis: {
    type: String,
  },
});
module.exports = mongoose.model("allcontent", allContentSchema);
