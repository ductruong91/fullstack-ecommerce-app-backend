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

    if (user?.role === "admin") {
      next();
    } else {
      return res.status(404).json({
        message: "k phai admin",
        status: "ERR",
      });
    }
  });
};

//xac thuc ng dung (nguoi yeu cau voi ng duoc yeu cau co phai la1 khi yeu cau tt ng dung)
const authUserMiddleware = (req, res, next) => {
  // console.log("req.header", req.headers);

  const token = req.headers.token.split(" ")[1]; // Lấy token từ header
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        message: "the authentication day",
        status: "ERR",
      });
    }
    //neu token hop le thì user se chua payload cua token

    //neu là admin hoặc người dùng và người được yêu cầu là 1
    if (user?.role === "admin" || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "k phai admin",
        status: "ERR",
      });
    }
  });
};

//xac thuc chu sp(id sp truyen trong param)(delete sp)
const authOwnerMiddleware = async (req, res, next) => {
  const token = req.headers.token.split(" ")[1]; // Lấy token từ header
  const productId = req.params.id;

  //Tìm sản phẩm trong cơ sở dữ liệu để kiểm tra người dùng có phải là chủ sở hữu không
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
        message: "khong phai admin || khong phai chu so huu",
        status: "ERR",
      });
    }
  });
};

//kiem tra token, giai ma va them vao req.user
const getUserIdMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1]; // Lấy token từ header

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Giải mã token để lấy thông tin người dùng
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
      req.user = payload;
    });

    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    // req.user = decoded.payload; // Lưu thông tin người dùng vào request
    // console.log("userId trong token", req.user.id);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized, please provide a valid token" });
  }
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
  authOwnerMiddleware,
  getUserIdMiddleware,
};
