const { Movie } = require('../models/movie');

const getMovies = async (ctx, next) => {
  const { page, perPage } = ctx.query;

  const movies = await Movie.find()
    .skip((page * perPage) - perPage)
    .limit(+perPage);

  if (movies) {
    ctx.status = 200;
    ctx.body = movies;
  } else {
    ctx.throw(404, 'Movies not found');
  }

  next();
};

const getMovieById = async (ctx, next) => {
  const { id } = ctx.params;
  const movie = await Movie.findOne({ id });

  if (movie) {
    ctx.status = 200;
    ctx.body = movie;
  } else {
    ctx.throw(404, 'Movie not found');
  }

  next();
};

module.exports = { getMovies, getMovieById };
