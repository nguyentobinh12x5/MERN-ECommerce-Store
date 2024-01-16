const express = require("express");
const {
  getAllProducts,
  getProductDetail,
  getRelateProducts,
  newProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { verifyToken, requireRole } = require("../middlware/JWTaction");
const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductDetail);
router.get("/category/:category", getRelateProducts);
router.post("/newproduct", verifyToken, requireRole("admin"), newProduct);
router.delete("/:id", verifyToken, requireRole("admin"), deleteProduct);
router.patch("/update/:id", verifyToken, requireRole("admin"), updateProduct);
module.exports = router;
