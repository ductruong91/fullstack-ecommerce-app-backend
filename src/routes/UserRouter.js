const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/log-out", UserController.logoutUser);
router.put("/update-user/:id", UserController.updateUser); //update voi link co chua id
router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser); //xoa voi link co chua id
router.get("/get-all-user", authMiddleware, UserController.getAllUser);
router.get("/get-detail-user/:id", authUserMiddleware, UserController.getDetailUser);
router.post("/refresh-token", UserController.refreshToken);


module.exports = router;
