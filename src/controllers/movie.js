const { Movie } = require('../models/movie');


const createFindObject = (queryObject) => {
  const result = {};
  for (const key in queryObject) {
    console.log(queryObject[key]);
    switch (key) {
      case 'popularity':
        result[key] = { $gt: queryObject[key] };
        break;
      case 'title':
        console.log(1);
        result[key] = new RegExp(queryObject[key], 'i');
        break;
      case 'release_date':
        result[key] = new RegExp(queryObject[key], 'i');
        break;
      case 'adult':
        result[key] = (queryObject[key] === 'true');
        break;
      default:
        result[key] = queryObject[key];
    }
  }
  console.log(result);
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
    const movies = await Movie.find(createFindObject(queryObject))
      .skip((page * perPage) - perPage)
      .limit(+perPage)
      .sort(createSortObject(sortBy));

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
