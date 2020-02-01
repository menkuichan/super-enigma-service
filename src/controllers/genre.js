const { Genre } = require('../models/genre');

const log = require('../log');

const getGenres = async (ctx) => {
  try {
    const genres = await Genre.find();

    ctx.status = 200;
    ctx.body = genres;
  } catch (error) {
    log.error(error, 'Error during getting genres');
    throw error;
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
    log.error(error, 'Error during getting genres by id');
    throw error;
  }
};

module.exports = { getGenres, getGenreById };
