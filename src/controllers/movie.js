const { Movie } = require('../models/movie');
const { movieQueryParams } = require('../constants');
const log = require('../log');

const createFindObject = (queryObject) => {
  const result = {};
  const keys = Object.keys(queryObject);
  keys.forEach((key) => {
    if (movieQueryParams.includes(key)) {
      switch (key) {
        case 'popularity':
        case 'vote_count':
          if (Number(queryObject[key])) result[key] = { $gt: queryObject[key] };
          break;
        case 'title':
        case 'original_title':
          result[key] = new RegExp(queryObject[key], 'i');
          break;
        case 'year': {
          const m = queryObject[key].match(/\d{4}/);
          if (m && m[0]) result.release_date = new RegExp(m[0], 'i');
          break;
        }
        case 'adult':
        case 'video':
          result[key] = (queryObject[key] === 'true');
          break;
        case 'genre':
          result.genre_ids = { $in: [queryObject[key]] };
          break;
        case 'lang':
          result.original_language = queryObject[key];
          break;
        default:
          break;
      }
    }
  });
  return result;
};

const createSortObject = (sortQuery) => {
  const result = {};
  if (sortQuery) {
    const arraySort = sortQuery.split('.');
    const { paths } = Movie.schema;
    const pathsKeys = Object.keys(paths);
    if ([arraySort[0]] && arraySort[1] && pathsKeys.includes(arraySort[0])) {
      result[arraySort[0]] = arraySort[1] === 'asc' ? 1 : -1;
    }
  }
  return result;
};

const getMovies = async (ctx) => {
  try {
    const {
      sortBy, page, perPage, ...queryObject
    } = ctx.query;
    const count = await Movie.countDocuments(createFindObject(queryObject));
    const movies = await Movie.find(createFindObject(queryObject))
      .skip((page * perPage) - perPage)
      .limit(+perPage)
      .sort(createSortObject(sortBy));

    ctx.status = 200;
    ctx.body = { movies, page, totalPages: Math.ceil(count / perPage) };
  } catch (error) {
    log.error(error, 'Error during getting movies');
    throw error;
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
    log.error(error, 'Error during getting movies by id');
    throw error;
  }
};

module.exports = { getMovies, getMovieById };
