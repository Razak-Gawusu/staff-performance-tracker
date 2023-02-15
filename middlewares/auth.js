const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied, no token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwt_secret"));
    req.user = decoded;

    next();
  } catch (error) {
    req.status(403).send("Access denied");
  }
};
