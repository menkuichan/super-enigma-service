const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  release_date: String,
  genre_ids: [{
    type: Number,
  }],
  vote_average: Number,
  popularity: Number,
  original_language: String,
  vote_count: Number,
  original_title: String,
  poster_path: String,
  adult: Boolean,
  backdrop_path: String,
  video: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

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
    .get('/movies', async (ctx, next) => {
      const { page, perPage } = ctx.query;

      const movies = await Movie.find({}, null, {
        skip: (page * perPage) - perPage,
        limit: +perPage
      });
      ctx.status = 200;
      ctx.body = movies;

      next();
    });

  app.use(router.routes());
});

app.listen(process.env.APP_PORT, () => {
  console.log('Service is running on', process.env.APP_PORT);
});
