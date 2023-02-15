const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  const db = config.get("mongodb_uri");
  mongoose.set("strictQuery", false);
  mongoose
    .connect(db)
    .then(() => winston.info(`succussfully connected to ${db}`));
};
