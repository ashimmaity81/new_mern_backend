// const createProductController = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log("creating product", data);
//     let newProduct = null;
//     try {
//       newProduct = await Product.create(data);
//     } catch (err) {
//       console.log("Error while creating product ...");
//       res.status(400);
//       res.json({
//         isSuccess: false,
//         message: `Err: ${err.message}`,
//         data: {},
//       });
//       //   return;
//     }
//     res.status(201).json({
//       isSuccess: true,
//       message: `Product created`,
//       data: {
//         product: newProduct,
//       },
//     });
//   } catch (err) {
//     console.log("Error in createProductController");
//     res
//       .status(501)
//       .json({ isSuccess: false, message: "internal server error", data: {} });
//   }
// };
// module.exports = { createProductController };

const { Product } = require("../../../models/product_schema.js");
const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product...", data);

    Object.keys(data).forEach((key) => {
      if (key == null || key == "") {
        delete data.key;
      }
    });

    let newProduct = await Product.create(data);
    res.status(201).json({
      isSuccess: true,
      message: `Product created`,
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError" || err.code == "11000") {
      res
        .status(400)
        .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
    }
    console.log("🔴 Error in createProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      isSuccess: true,
      message: "Product list fetched",
      data: { products: allProducts },
    });
  } catch (err) {
    console.log("Error in getAllProducts", err.message);
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal server Error", data: {} });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;

    const newProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
      runValidators: true,
    });
    if (newProduct === null) {
      res.status(500);
      res.json({
        isSuccess: false,
        message: "Invalid productID",
        data: {},
      });
      return;
    }
    res.status(200).json({
      isSuccess: true,
      message: "Product updated",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log("Error in updateProductController", err.message);
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};
const deleteItems = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedItem = await Product.findByIdAndDelete(productId);

    res.status(204);
    res.json({
      isSuccess: true,
      message: "Product deleted",
      data: {
        product: deletedItem,
      },
    });
  } catch (err) {
    console.log("---- error occurred in post products ----");
    console.log(err.message);
    console.log("---------------");
    res.status(500);
    res.json({
      isSuccess: false,
      message: "Internal Server Error",
      data: {
        errMessage: err.message,
      },
    });
  }
};

module.exports = {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteItems,
};
