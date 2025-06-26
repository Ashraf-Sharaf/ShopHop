const express = require("express");
const { body, param} = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProdcuts);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validateMiddleware,
  productController.getProduct
);

router.post(
  "/",
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
  "/:id",
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
  "/:id",
  authMiddleware,
  adminMiddleware,
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validateMiddleware,
  productController.deleteProduct
);

module.exports = router;
