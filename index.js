const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

const { getMovies, getMovieById } = require('./src/controllers/movie');
const { getGenres, getGenreById } = require('./src/controllers/genre');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  router
    .get('/movies', getMovies)
    .get('/movies/:id', getMovieById)
    .get('/genres', getGenres)
    .get('/genres/:id', getGenreById);

  app.use(router.routes());
});

app.listen(process.env.APP_PORT, () => {
  console.log('Service is running on', process.env.APP_PORT);
});
