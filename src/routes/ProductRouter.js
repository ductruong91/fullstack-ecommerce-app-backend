const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authUserMiddleware, authOwnerMiddleware } = require("../middleware/authMiddleware");


router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/detail/:id", ProductController.detailProduct);
router.delete("/delete/:id",authOwnerMiddleware , ProductController.deleteProduct);

//get all for all user: admin: all, user: user's product
router.get("/get-all-product", ProductController.detailProduct);

module.exports = router;
