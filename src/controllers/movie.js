const { Movie } = require('../models/movie');

const getMovies = async (ctx) => {
  try {
    const { page, perPage } = ctx.query;

    const movies = await Movie.find()
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

    if (movie) {
      ctx.status = 200;
      ctx.body = movie;
    } else {
      ctx.throw(404, 'Movie not found');
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

module.exports = { getMovies, getMovieById };
