// #region Global Imports
const morgan = require('morgan');
// #endregion Global Imports

// #region Local Imports
const Logger = require('../libs/logger');
// #endregion Local Imports

const stream = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};

const morganMiddleware = morgan('short', { stream, skip });

module.exports = morganMiddleware;
