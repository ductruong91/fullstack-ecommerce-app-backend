const UserRouter = require("./UserRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.get("/", (req, res) => {
    res.send("hello from simple server :)");
  });
};

module.exports = routes;
