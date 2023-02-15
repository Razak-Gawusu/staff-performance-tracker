const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 55,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    lowercase: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwt_secret")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().required().email(),
    role: Joi.string(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports.User = User;
module.exports.validate = validateUser;
