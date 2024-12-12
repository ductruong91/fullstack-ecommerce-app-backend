const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authUserMiddleware } = require("../middleware/authMiddleware");


router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/detail/:id", ProductController.detailProduct);
router.delete("/delete/:id",authUserMiddleware , ProductController.deleteProduct);


module.exports = router;
