const wst = require('winston');
const logger = wst.createLogger();

// pipe to console for dev
// TODO: production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new wst.transports.Console({
    format: wst.format.combine(
      wst.format.colorize(),
      wst.format.splat(),
      wst.format.timestamp(),
      wst.format.printf(({level, message, timestamp}) => {
        return `${timestamp} ${level} - ${message}`;
      })
    )
  }));
}

module.exports = logger;