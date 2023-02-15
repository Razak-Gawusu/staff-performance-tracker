const express = require("express");
const { isValidObjectId } = require("mongoose");
const route = express.Router();
const { Level, validate } = require("../models/level");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.get("/", auth, async (req, res) => {
  const levels = await Level.find({});
  res.status(200).send(levels);
});

route.get("/:id", auth, async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) return res.status(400).send("invalid level id");

  const level = await Level.findById(req.params.id);
  if (!level) return res.status(400).send("level not Found");

  res.status(200).send(level);
});

route.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const level = new Level({
    level: req.body.level,
    rank: req.body.rank,
    points: req.body.points,
  });

  level.save();

  res.status(201).send(level);
});

route.patch("/:id", [auth, admin], async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) return res.status(400).send("invalid level id");

  const level = await Level.findByIdAndUpdate(
    req.params.id,
    {
      level: req.body.level,
      rank: req.body.rank,
      points: req.body.points,
    },
    { new: true }
  );

  res.status(201).send(level);
});

route.delete("/:id", [auth, admin], async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) return res.status(400).send("invalid level id");

  const level = await Level.findByIdAndDelete(req.params.id);

  res.status(201).send(level);
});

module.exports = route;
