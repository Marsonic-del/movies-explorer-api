const route = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

route.post('/signup', validateUserBody, createUser);
route.post('/signin', validateAuthentication, login);
route.use(auth);
route.use('/users', userRouter);
route.use('/movies', movieRouter);
route.use((req, res, next) => next(new NotFoundError('Несуществующий маршрут')));

module.exports = route;
