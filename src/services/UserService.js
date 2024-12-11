const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

      console.log("so sanh mk:", comparePassword);

if (!comparePassword) {
  resolve({
    status: "ok",
    message: "mk khong dung",
  })
}
      resolve({
        status: "ok",
        message: "login success",
        data: checkUser,
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
