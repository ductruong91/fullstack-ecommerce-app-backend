const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);

  app.get("/", (req, res) => {
    res.send("hello from simple server :)");
  });
};

module.exports = routes;
