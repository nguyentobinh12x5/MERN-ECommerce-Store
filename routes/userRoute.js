const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken, requireRole } = require("../middlware/JWTaction");
const router = express.Router();
router.get("/", verifyToken, requireRole("admin"), getAllUsers);
router.get("/:id", verifyToken, requireRole("admin"), getUser);
router.delete("/:id", verifyToken, requireRole("admin"), deleteUser);
module.exports = router;
