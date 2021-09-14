// Константные значения кодов ошибок
const ERR_400 = 400;
const ERR_401 = 401;
const ERR_403 = 403;
const ERR_404 = 404;
const ERR_409 = 409;
const ERR_500 = 500;

// Обьект с описанием ошибки
const errorMessages = {
  usersPost400: 'Переданы некорректные данные при создании пользователя',

  notValidEmail409: 'Пользователь с таким email уже существует',

  notValidEmailOrPassword: 'Неправильные почта или пароль',

  usersIdGet: 'Пользователь по указанному _id не найден',

  usersMePatch400: 'Переданы некорректные данные при обновлении профиля',

  usersMePatch404: 'Пользователь с указанным _id не найден',

  usersMeAvatarPatch404: 'Пользователь с указанным _id не найден',

  cardsPost400: 'Переданы некорректные данные при создании фильма',

  cardsDelete400: 'Фильм с указанным _id не найден',

  cardsDelete403: 'Вы не можете удалять чужые фильмы',

  defaultMessage500: 'Ошибка сервера',
};

module.exports = {
  ERR_400,
  ERR_401,
  ERR_403,
  ERR_404,
  ERR_409,
  ERR_500,
  errorMessages,
};
