const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../../../models/user");

describe("user.generateAuthToken", () => {
  it("should generate a valid auth token", () => {
    // user
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      name: "gawusu razak",
      role: "admin",
    };

    const user = new User(payload);
    // generate token based on user
    const token = user.generateAuthToken();

    // verify token
    const decode = jwt.verify(token, config.get("jwt_secret"));

    // assert if its decoded is equal to payload
    expect(decode).toMatchObject({ _id: payload._id, role: payload.role });
  });
});
