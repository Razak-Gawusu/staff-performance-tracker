const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const level = require("../routes/levels");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/spt/api/users", users);
  app.use("/spt/api/login", auth);
  app.use("/spt/api/level", level);
  app.use(error);
};
