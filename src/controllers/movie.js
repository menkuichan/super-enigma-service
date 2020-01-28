const { Movie } = require('../models/movie');

const getMovies = async (ctx) => {
  try {
    const {
      sortBy, page, perPage, year, adult, language, popularity, title,
    } = ctx.query;

    const movies = await Movie.find({
      release_date: new RegExp(year, 'i'),
      title: new RegExp(title, 'i'),
      original_language: new RegExp(language, 'i'),
    })
      .skip((page * perPage) - perPage)
      .limit(+perPage);

    ctx.status = 200;
    ctx.body = movies;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
};

const getMovieById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const movie = await Movie.findOne({ id });

    ctx.assert(movie, 404, 'Movie not found');

    ctx.status = 200;
    ctx.body = movie;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

module.exports = { getMovies, getMovieById };
