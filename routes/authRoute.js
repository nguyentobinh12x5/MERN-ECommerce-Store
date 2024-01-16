const express = require("express");
const { register, login, tokenauth } = require("../controllers/authController");
const { verifyToken } = require("../middlware/JWTaction");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/tokenauth", verifyToken, tokenauth);
module.exports = router;
