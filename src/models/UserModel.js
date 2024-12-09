const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String }, // Link ảnh đại diện
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Phân quyền
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
