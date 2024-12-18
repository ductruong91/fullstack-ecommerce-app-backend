const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Người đăng sản phẩm
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    images: { type: [String], required: true }, // Mảng URL của các hình ảnh sản phẩm
    stock: { type: Number, required: true },
    sold: { type: Number, default: 0 }, // Số lượng đã bán
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Tham chiếu đến review
    // rating: { type: Number, required: true },
    address: { type: String },
    condition: { type: String },
    owner: {
      name: { type: String, required: true }, // Tên chủ sản phẩm
      email: { type: String }, // Email chủ sản phẩm
      phone: { type: String }, // Số điện thoại chủ sản
      address: { type: String },
      avatar: { type: String },
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
