const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    // console.log(req.body); // Kiểm tra dữ liệu từ client
    const { email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = emailRegex.test(email);

    // console.log("check email", isCheckEmail);

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, password are required",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "pass is not equal confirm pass",
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
    // console.log(req.body); // Kiểm tra dữ liệu từ client
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = emailRegex.test(email);

    // console.log("check email", isCheckEmail);

    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, password are required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "input is not email",
      });
    }

    const result = await UserService.loginUser(req.body); // Gọi hàm và truyền req.body
    const { refresh_token, ...newResponse } = result;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      samesite: "strict",
    });

    return res.status(200).json(newResponse); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "userid khong co trong duong dan",
      });
    }

    const result = await UserService.updateUser(userId, data); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "userid khong co trong duong dan",
      });
    }

    const result = await UserService.deleteUser(userId); // Gọi hàm và truyền req.body
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "userid not dèine",
      });
    }

    const result = await UserService.getDetailUser(userId); // Gọi hàm và truyền
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const refreshToken = async (req, res) => {
  // console.log("req cookie:", req.cookies);

  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "token not required",
      });
    }

    const result = await JwtService.refreshTokenService(token); // Gọi hàm và truyền
    return res.status(200).json(result); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};

const logoutUser = async (req, res) => {
  // console.log("req cookie:", req.cookies);

  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "oke",
      message: "log out",
    }); // Gửi phản hồi với status 200 và dữ liệu trả về
  } catch (error) {
    return res.status(404).json({
      message: error.message || "An error occurred", // Trả lỗi kèm thông báo
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
};
