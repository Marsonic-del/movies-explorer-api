const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, {
          allow_protocol_relative_urls: true,
          allow_underscores: true,
          require_host: false,
        });
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, {
          allow_protocol_relative_urls: true,
          allow_underscores: true,
          require_host: false,
        });
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, {
          allow_protocol_relative_urls: true,
          allow_underscores: true,
          require_host: false,
        });
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
