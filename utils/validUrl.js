const validator = require('validator');

const validUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};
module.exports = validUrl;
