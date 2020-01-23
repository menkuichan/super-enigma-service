const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  release_date: String,
  genre_ids: [{
    type: Number,
  }],
  vote_average: Number,
  popularity: Number,
  original_language: String,
  vote_count: Number,
  original_title: String,
  poster_path: String,
  adult: Boolean,
  backdrop_path: String,
  video: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
