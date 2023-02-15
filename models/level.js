const mongoose = require("mongoose");
const Joi = require("joi");

const levelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    unique: true,
    enum: ["beginner", "intermediate", "expert"],
    lowercase: true,
  },
  rank: {
    type: String,
    required: true,
    enum: ["0-2", "3-5", "6"],
  },
  points: {
    type: Number,
    required: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

function validateSkillLevel(data) {
  const schema = Joi.object({
    level: Joi.string().required(),
    rank: Joi.string().required(),
    points: Joi.number().required(),
  });

  return schema.validate(data);
}

module.exports.Level = Level;
module.exports.validate = validateSkillLevel;
