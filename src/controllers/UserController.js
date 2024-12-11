const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    console.log(req.body); // Kiểm tra dữ liệu từ client
    const { email, password, name } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = emailRegex.test(email);

    // console.log("check email", isCheckEmail);

    if (!email || !password || !name) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, password, and name are required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "input is not email",
      });
    }

    const result = await UserService.createUser(req.body); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body); // Kiểm tra dữ liệu từ client
    const { email, password, name } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = emailRegex.test(email);

    // console.log("check email", isCheckEmail);

    if (!email || !password || !name) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, password, and name are required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "input is not email",
      });
    }

    const result = await UserService.loginUser(req.body); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};
module.exports = {
  createUser,
  loginUser
};
