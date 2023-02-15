require("express-async-errors");
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/db")();
require("./startup/routes")(app);

const server = app.listen(5050, () =>
  winston.info("server is running on PORT: 5050")
);
module.exports = server;
