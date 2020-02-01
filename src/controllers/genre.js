const { Genre } = require('../models/genre');

const log = require('../log');

const getGenres = async (ctx) => {
  try {
    const genres = await Genre.find();

    log.info('Successfully get genres');
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

    log.info('Successfully get genre by id');
    ctx.status = 200;
    ctx.body = genre;
  } catch (error) {
    log.error(error, 'Error during getting genres by id');
    throw error;
  }
};

module.exports = { getGenres, getGenreById };
