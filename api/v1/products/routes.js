const express = require("express");
const {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteItems,
} = require("./controller.js");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductController);

productRouter.patch("/:productId", updateProductController);
productRouter.delete("/:productId", deleteItems);
module.exports = { productRouter };
