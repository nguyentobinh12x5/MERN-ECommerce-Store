const express = require("express");
const {
  CreateOrder,
  OrderDetail,
  GetUserOrder,
  GetAllOrder,
  DeleteOrder,
  getBill,
} = require("../controllers/orderControler");
const { verifyToken, requireRole } = require("../middlware/JWTaction");
const router = express.Router();
router.post(
  "/create",
  verifyToken,
  requireRole(["customer", "admin", "employee"]),
  CreateOrder
);
router.get(
  "/orderdetail/:id",
  verifyToken,
  requireRole(["customer", "admin", "employee"]),
  OrderDetail
);
router.get(
  "/user/:email",
  verifyToken,
  requireRole(["customer", "admin", "employee"]),
  GetUserOrder
);
router.delete(
  "/:id",
  verifyToken,
  requireRole(["customer", "admin", "employee"]),
  DeleteOrder
);
router.get("/", verifyToken, requireRole("admin"), GetAllOrder);
router.post(
  "/getbill",
  verifyToken,
  requireRole(["customer", "admin", "employee"]),
  getBill
);
module.exports = router;
