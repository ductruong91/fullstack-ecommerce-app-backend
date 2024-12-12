const Product = require("../models/ProductModel");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//xac thuc admin
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1]; // Lấy token từ header

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: "ERR",
      });
    }
    //neu token hop le thì user se chua payload cua token

    const { payload } = user;

    if (payload?.role === "admin") {
      next();
    } else {
      return res.status(404).json({
        message: "k phai admin",
        status: "ERR",
      });
    }
  });
};

//xac thuc ng dung (nguoi yeu cau voi ng duoc yeu cau co phai la1)
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1]; // Lấy token từ header
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: "ERR",
      });
    }
    //neu token hop le thì user se chua payload cua token

    const { payload } = user;
    //neu là admin hoặc người dùng và người được yêu cầu là 1
    if (payload?.role === "admin" || payload?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "k phai admin",
        status: "ERR",
      });
    }
  });
};

//xac thuc chu sp(id sp truyen trong param)
const authOwnerMiddleware = async (req, res, next) => {
  const token = req.headers.token.split(" ")[1]; // Lấy token từ header
  const productId = req.params.id;

  // 6. Tìm sản phẩm trong cơ sở dữ liệu để kiểm tra người dùng có phải là chủ sở hữu không
  const product = await Product.findById(productId);

  // Kiểm tra nếu không tìm thấy sản phẩm
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: "ERR",
      });
    }
    //neu token hop le thì user se chua payload cua token

    const { payload } = user;
    //neu là admin hoặc người dùng và người được yêu cầu là 1
    if (payload?.role === "admin" || payload?.userId === product.userId) {
      next();
    } else {
      return res.status(404).json({
        message: "k phai admin || khong phai chu so huu",
        status: "ERR",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
  authOwnerMiddleware,
};
