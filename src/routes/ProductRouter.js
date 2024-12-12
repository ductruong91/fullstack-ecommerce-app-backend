const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const {
  authUserMiddleware,
  authOwnerMiddleware,
  getUserIdMiddleware,
} = require("../middleware/authMiddleware");


router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/detail/:id", ProductController.detailProduct);
router.delete("/delete/:id",authOwnerMiddleware , ProductController.deleteProduct);

router.get("/get-all-product", ProductController.getAllProduct);
router.get("/get-user-product",getUserIdMiddleware, ProductController.getUserProduct);

module.exports = router;
