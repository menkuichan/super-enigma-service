const { Genre } = require('../models/genre');

const getGenres = async (ctx, next) => {
  const genres = await Genre.find();
  if (genres) {
    ctx.status = 200;
    ctx.body = genres;
  } else {
    ctx.throw(404, 'Genres not found');
  }

  next();
};

const getGenreById = async (ctx, next) => {
  const { id } = ctx.params;
  const genre = await Genre.findOne({ id });
  if (genre) {
    ctx.status = 200;
    ctx.body = genre;
  } else {
    ctx.throw(404, 'Genre not found');
  }

  next();
};

module.exports = { getGenres, getGenreById };
