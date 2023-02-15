const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const { isValidObjectId } = require("mongoose");
const auth = require("../middlewares/auth");
const route = express.Router();

route.get("/me", auth, async (req, res) => {
  if (req.user === null || req.user === undefined)
    return res.status(400).send("Invalid user, please login");

  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(400).send("user does not exist");
  res.status(200).send(user);
});

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("email already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;

  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(201)
    .send(_.pick(user, ["name", "email", "role"]));
});

module.exports = route;
