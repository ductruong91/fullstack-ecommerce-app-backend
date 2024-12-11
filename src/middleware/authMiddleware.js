const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  console.log("check token:", req.headers.token);
  const token = req.headers.token.split(" ")[1]; // Lấy token từ header

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication",
        status: "ERR",
      });
    }
    const { payload } = user;
    // console.log("role", payload.role);

    if (payload.role === "admin") {
      next();
      console.log("true");
    } else {
      return res.status(404).json({
        message: "k phai admin",
        status: "ERR",
      });
    }
  });
};
module.exports = {
  authMiddleware,
};
