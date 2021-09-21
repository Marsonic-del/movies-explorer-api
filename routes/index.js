const route = require('express').Router();
const cors = require('cors');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

const corsOptions = {
  origin: ['https://kina-ne-budet.nomoredomains.monster', 'http://kina-ne-budet.nomoredomains.monster', 'http://localhost:3000', 'https://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/* const whitelist = ['https://kina-ne-budet.nomoredomains.monster', 'http://kina-ne-budet.nomoredomains.monster', 'http://localhost:3000', 'https://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    console.log('allowed');
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
    console.log('not allowed');
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}; */

route.options('*', cors(corsOptions));
route.post('/signup', validateUserBody, cors(corsOptions), createUser);
route.post('/signin', validateAuthentication, cors(corsOptions), login);
route.use(auth);
route.use('/users', cors(corsOptions), userRouter);
route.use('/movies', cors(corsOptions), movieRouter);
route.use((req, res, next) => next(new NotFoundError('Несуществующий маршрут')));

module.exports = route;
