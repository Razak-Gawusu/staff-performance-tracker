const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");
const route = express.Router();

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword)
    return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(201)
    .send(_.pick(user, ["name", "email"]));
});

function validate(data) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = route;
