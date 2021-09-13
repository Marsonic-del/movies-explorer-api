const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const route = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
// const validUrl = require('./utils/validUrl')
// const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(route);
app.use(errorLogger); // подключаем логгер ошибок

// здесь обрабатываем все ошибки
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик
app.use(errorHandler);

app.listen(PORT);
