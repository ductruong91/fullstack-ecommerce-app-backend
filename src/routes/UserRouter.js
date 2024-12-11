const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.put("/update-user/:id", UserController.updateUser); //update voi link co chua id
router.delete("/delete-user/:id",authMiddleware, UserController.deleteUser); //update voi link co chua id

module.exports = router;
