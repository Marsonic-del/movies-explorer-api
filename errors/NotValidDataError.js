const { ERR_400 } = require('../utils/constants');

class NotValidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_400;
  }
}
module.exports = { NotValidDataError };
