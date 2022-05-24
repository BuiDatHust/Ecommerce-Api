const {logger} = require("../logger/logger.logger");

const _handerError = (err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} ` + err.message);
    const errorMsg = err.message;
    res.status(err.status || 500).json({
      code: -1,
      status: `error`,
      message: errorMsg,
      elements: {}
    })
}

module.exports = _handerError