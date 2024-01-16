require("dotenv").config();
const jwt = require("jsonwebtoken");
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: "1h" });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = (req, res, next) => {
  let key = process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(400);
  jwt.verify(token, key, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
const requireRole = (roles) => {
  return function (req, res, next) {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: `Invalid role: ${user.role}` });
    }
  };
};
module.exports = { createJWT, verifyToken, requireRole };
