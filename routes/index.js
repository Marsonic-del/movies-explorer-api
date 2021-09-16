const route = require('express').Router();
const cors = require('cors');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

/* const corsOptions = {
  origin: ['https://kina-ne-budet.nomoredomains.monster', 'http://kina-ne-budet.nomoredomains.monster'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}; */

const whitelist = ['https://kina-ne-budet.nomoredomains.monster', 'http://kina-ne-budet.nomoredomains.monster'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

route.post('/signup', cors(corsOptionsDelegate), validateUserBody, createUser);
route.post('/signin', validateAuthentication, login);
route.use(auth);
route.use('/users', userRouter);
route.use('/movies', movieRouter);
route.use((req, res, next) => next(new NotFoundError('Несуществующий маршрут')));

module.exports = route;
