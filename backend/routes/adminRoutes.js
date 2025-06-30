const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");
const productController = require("../controllers/productController");

router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  adminController.getSummary
);

router.get(
  "/all_users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);

router.get(
  "/all_orders",
  authMiddleware,
  adminMiddleware,
  adminController.getAllOrders
);

router.post(
  "/product/add",
  authMiddleware,
  adminMiddleware,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("image").optional().isString(),
    body("description").optional().isString(),
  ],
  validateMiddleware,
  productController.addProduct
);

router.put(
  "/product/:id/edit",
  authMiddleware,
  adminMiddleware,
  [
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
  ],
  validateMiddleware,
  productController.editProduct
);

router.delete(
  "/product/:id/delete",
  authMiddleware,
  adminMiddleware,
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validateMiddleware,
  productController.deleteProduct
);

module.exports = router;
