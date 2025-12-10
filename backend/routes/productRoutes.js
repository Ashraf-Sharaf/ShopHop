const express = require("express");
const { param } = require("express-validator");
const router = express.Router();
const validateMiddleware = require("../middleware/validateMiddleware");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validateMiddleware,
  productController.getProduct
);

module.exports = router;
