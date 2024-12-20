const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleware,
  authOwnerMiddleware,
  getUserIdMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", OrderController.createOrder);
router.put("/update/:id", OrderController.updateOrderById);
router.get("/detail/:id", OrderController.getOrderById);

router.delete("/delete/:id", authMiddleware, OrderController.deleteOrderById);
//chi admin moi co the xoa order, ng thuong chi co the up date trag thai

router.get("/get-all-order", OrderController.getAllOrders);
router.get("/get-buy-user-order/:id", OrderController.getBuyUserOrders);
router.get("/get-sell-user-order/:id", OrderController.getSellUserOrders);
router.get("/get-all-order-populate", OrderController.getAllOrdersPopulate);



module.exports = router;
