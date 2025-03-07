const init = require('../init');
const logger = init.logger;

function apiLogger(req, res, next) {
    const { method, url } = req;

    if (init.LOG_LEVEL === 'trace') {
        logger.trace(`[REQUEST] ${method} ${url}`);
    } else if (init.LOG_LEVEL === 'debug') {
        logger.debug(`[REQUEST] ${method} ${url}`);
    } else if (init.LOG_LEVEL === 'info') {
        logger.info(`[REQUEST] ${method} ${url}`);
    }

    next();
}

module.exports = apiLogger;
