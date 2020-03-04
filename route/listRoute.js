const express = require("express");
const controller = require("../controller/listController");

const listRoute = express.Router();

listRoute.get("/", controller.index);
listRoute.get("/:id", controller.show);
listRoute.post("/", controller.create);
listRoute.post("/reorderlist", controller.updateOrder);
listRoute.put("/:id", controller.update);
listRoute.delete("/:id", controller.destroy);

module.exports = listRoute;
