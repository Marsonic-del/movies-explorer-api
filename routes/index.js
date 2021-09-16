const route = require('express').Router();
const cors = require('cors');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

const corsOptions = {
  origin: ['https://kina-ne-budet.nomoredomains.monster', 'http://kina-ne-budet.nomoredomains.monster'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

route.post('/signup', cors(corsOptions), validateUserBody, createUser);
route.post('/signin', validateAuthentication, login);
route.use(auth);
route.use('/users', userRouter);
route.use('/movies', movieRouter);
route.use((req, res, next) => next(new NotFoundError('Несуществующий маршрут')));

module.exports = route;
