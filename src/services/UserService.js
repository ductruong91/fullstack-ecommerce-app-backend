const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, name } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      // kiem tra xem email da ton taij chua
      if (checkUser !== null) {
        resolve({
          status: "ok",
          message: " email da ton tai",
        });
      }
      const saltRounds = 10; // Số vòng salt

      const hash = bcrypt.hashSync(password, saltRounds);
      console.log("hash", hash);

      //tao user va dua vao trong databases
      const createdUser = await User.create({
        email,
        password: hash,
        name,
      });

      //tra ket qua
      if (createdUser) {
        resolve({
          status: "ok",
          message: "success",
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, name } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      // kiem tra xem email da ton taij chua
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " email khong ton tai",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      // console.log("so sanh mk:", comparePassword);

      if (!comparePassword) {
        resolve({
          status: "ok",
          message: "mk khong dung",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      resolve({
        status: "ok",
        message: "login success",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      // kiem tra xem id cos ton tai ng nao khong da ton taij chua
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " id khong ton tai",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      //{new:true} tra ve doc sau khi cap nhat

      resolve({
        status: "ok",
        message: "ud success",
        data: updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai ng nao khong da ton taij chua
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " id khong ton tai",
        });
      }

      // await User.findByIdAndDelete(id);

      resolve({
        status: "ok",
        message: "delete user success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({
        status: "ok",
        message: "success",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      // kiem tra xem id co ton tai ng nao khong da ton taij chua
      if (user === null) {
        resolve({
          status: "ok",
          message: " user is not dèine",
        });
      }

      resolve({
        status: "ok",
        message: " success get data",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
};
