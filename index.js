const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koaBunyanLogger = require('koa-bunyan-logger');
const koaError = require('koa-error');

const app = new Koa();
const router = new Router();
const cors = require('@koa/cors');

app.use(cors());

const { getMovies, getMovieById } = require('./src/controllers/movie');
const { getGenres, getGenreById } = require('./src/controllers/genre');

const log = require('./src/log');

app.use(koaBunyanLogger(log));
app.use(koaBunyanLogger.requestLogger());

app.use(koaError({
  accepts: ['json'],
}));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line
}

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  log.error(error, 'Error during connecting to MongoDB');
});

mongoose.connection.once('open', () => {
  log.info('Connected to MongoDB');

  router
    .get('/movies', getMovies)
    .get('/movies/:id', getMovieById)
    .get('/genres', getGenres)
    .get('/genres/:id', getGenreById);

  app.use(router.routes());
});

app.listen(process.env.APP_PORT, () => {
  log.info('Service is running on', process.env.APP_PORT);
});
