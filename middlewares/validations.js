const { celebrate, Joi } = require('celebrate');
const validUrl = require('../utils/validUrl');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserPatch = celebrate({
  // валидируем параметры
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().integer().min(0)
      .message('Duration must be number integer type'),
    year: Joi.string().pattern(/^[0-9]+$/).required(),
    description: Joi.string().required(),
    trailer: Joi.string().custom(validUrl).required(),
    image: Joi.string().custom(validUrl).required(),
    thumbnail: Joi.string().custom(validUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required().integer().min(0),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserPatch,
  validateMoviePost,
  validateMovieId,
};
