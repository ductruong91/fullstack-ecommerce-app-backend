const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

    if (payload.role === "admin") {
      next();
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