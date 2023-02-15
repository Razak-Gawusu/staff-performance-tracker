const winston = require("winston");
// require("winston-mongodb");

module.exports = function () {
  process.on("uncaughtException", (err) => {
    winston.error(err, err.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    winston.error(err, err.message);
    process.exit(1);
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost:27017/performance_tracker",
  //   level: "info",
  // });
};
