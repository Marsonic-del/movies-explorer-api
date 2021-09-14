const jwt = require('jsonwebtoken');
const { InvalidEmailOrPasswordError } = require('../errors/InvalidEmailOrPasswordError');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new InvalidEmailOrPasswordError('Необходима авторизация'));
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new InvalidEmailOrPasswordError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
