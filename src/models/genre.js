const mongoose = require('mongoose');

const genreScheme = new mongoose.Schema({
  id: Number,
  name: String,
});

const Genre = mongoose.model('Genre', genreScheme);

module.exports = { Genre };
