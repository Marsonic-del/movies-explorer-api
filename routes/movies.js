const movieRouter = require('express').Router();
const { createMovie, getMovies } = require('../controllers/movies');

movieRouter.post('/', createMovie);
movieRouter.get('/', getMovies);

module.exports = movieRouter;
