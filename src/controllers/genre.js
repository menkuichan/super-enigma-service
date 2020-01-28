const { Genre } = require('../models/genre');

const getGenres = async (ctx) => {
  try {
    const genres = await Genre.find();

    ctx.status = 200;
    ctx.body = genres;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
  }
};

const getGenreById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const genre = await Genre.findOne({ id });

    ctx.assert(genre, 404, 'Genre not found');

    ctx.status = 200;
    ctx.body = genre;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

module.exports = { getGenres, getGenreById };
