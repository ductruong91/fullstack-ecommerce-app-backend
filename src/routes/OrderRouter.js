const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleware,
  authOwnerMiddleware,
  getUserIdMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", OrderController.createOrder);
router.put("/update/:id", OrderController.updateOrderById);
router.get("/detail/:id", OrderController.getOrderById);
router.delete(
  "/delete/:id",
  authOwnerMiddleware,
  OrderController.deleteOrderById
);

router.get("/get-all-order", OrderController.getAllOrders);
router.get("/get-buy-user-order/:id", OrderController.getBuyUserOrders);
router.get("/get-sell-user-order/:id", OrderController.getSellUserOrders);

module.exports = router;
