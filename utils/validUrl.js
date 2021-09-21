const validator = require('validator');

const validUrl = (value) => {
  const result = validator.isURL(value, {
    allow_protocol_relative_urls: true,
    allow_underscores: true,
    require_host: false,
  });
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};
module.exports = validUrl;
