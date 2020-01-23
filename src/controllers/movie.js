const { Movie } = require('../models/movie');

const getMovies = async (ctx, next) => {
  const { page, perPage } = ctx.query;

  const movies = await Movie.find()
    .skip((page * perPage) - perPage)
    .limit(+perPage);

  ctx.status = 200;
  ctx.body = movies;

  next();
}

const getMovieById = async (ctx, next) => {
  const { id } = ctx.params;
  const movie = await Movie.findOne({ id });

  ctx.status = 200;
  ctx.body = movie;

  next();
}

module.exports = { getMovies, getMovieById };
