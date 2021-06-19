const morgan = require('morgan');
const Logger = require('../libs/logger');

const stream = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};

const morganMiddleware = morgan('short', { stream, skip });

module.exports = morganMiddleware;
