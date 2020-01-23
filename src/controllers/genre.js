const { Genre } = require('../models/genre');

const getGenres = async (ctx, next) => {
  const genres = await Genre.find();

  ctx.status = 200;
  ctx.body = genres;

  next();
}

const getGenreById = async (ctx, next) => {
  const { id } = ctx.params;
  const genre = await Genre.findOne({ id });

  ctx.status = 200;
  ctx.body = genre;

  next();
}

module.exports = { getGenres, getGenreById };
