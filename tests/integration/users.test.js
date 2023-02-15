const request = require("supertest");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("users", () => {
  beforeEach(() => {
    server = require("../..");
  });

  afterEach(async () => {
    await User.remove({});
    server.close();
  });

  describe("POST /", () => {
    let name;
    let email;
    let password;
    function exec() {
      return request(server).post("/spt/api/users").send({
        name,
        email,
        password,
      });
    }

    beforeEach(() => {
      name = "gawusu razak";
      email = "gawusu@mail.com";
      password = "Grazak803369";
    });

    it("should return 400 when name is not provided", async () => {
      name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 when email is not provided", async () => {
      email = "g";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 when password is not provided", async () => {
      password = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save user when info is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it("should return 400 if a user's email already exist", async () => {
      const user = new User({
        _id: mongoose.Types.ObjectId().toHexString(),
        name: "gawusu razak",
        email: "gawusu@mail.com",
        password: "password12345",
        role: "admin",
      });
      await user.save();
      const res = await exec();

      expect(res.status).toBe(400);
    });
  });

  describe("GET /me", () => {
    let token;
    function exec() {
      return request(server)
        .get("/spt/api/users/me")
        .set("x-auth-token", token);
    }

    beforeEach(async () => {
      const user = new User({
        _id: mongoose.Types.ObjectId().toHexString(),
        name: "gawusu razak",
        email: "gawusu@mail.com",
        password: "password12345",
        role: "admin",
      });
      await user.save();
      token = user.generateAuthToken();
    });

    it("should return 400 when token is not provided", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 when token is not a valid user token", async () => {
      token = new User().generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 200 when token is not provided", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
