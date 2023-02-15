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
    let email;
    let password;

    function register() {
      return request(server).post("/spt/api/users").send({
        name: "Gawusu Razak",
        email: "gawusu@mail.com",
        password: "12345",
      });
    }

    function login() {
      return request(server).post("/spt/api/login").send({
        email,
        password,
      });
    }

    beforeEach(async () => {
      await register();

      email = "gawusu@mail.com";
      password = "12345";
    });

    it("should return 400 when user does not exit", async () => {
      email = "adam@mail.com";
      const res = await login();
      expect(res.status).toBe(400);
    });

    it("should return 400 when email is not provided", async () => {
      email = "23456789";
      const res = await login();
      expect(res.status).toBe(400);
    });
    it("should return 400 when password is not provided", async () => {
      password = "23456789";
      const res = await login();
      expect(res.status).toBe(400);
    });

    it("should return 400 when password is wrong", async () => {
      const res = await login();
      expect(res.status).toBe(201);
    });
  });
});
