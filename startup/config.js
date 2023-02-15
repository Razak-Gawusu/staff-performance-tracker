const config = require("config");

module.exports = function () {
  if (!config.get("jwt_secret")) {
    throw new Error("FATAL ERROR, no JWT secret");
  }
};
