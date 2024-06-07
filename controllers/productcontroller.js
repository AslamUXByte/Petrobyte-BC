const Products = require("../models/products");

let getProducts = async (req, res) => {
  try {
    let products = await Products.find();
    res.status(200).json({ message: products });
  } catch (error) {
    res.json(error);
  }
};

let getProductsById = async (req, res) => {
  let product_id = req.query.id;
  try {
    let product = await Products.findOne({ _id: product_id });
    res.status(200).json({ message: product });
  } catch (error) {
    res.json(error);
  }
};

let postProducts = async (req, res) => {
  let productData = req.body;
  try {
    let saveData = await Products.create(productData);
    res.status(200).json({ message: "Product Added Successfully" });
  } catch (error) {
    res.json(error);
  }
};

let putProducts = async (req, res) => {
  let productData = req.body;
  try {
    const updateData = await Products.findOneAndUpdate(
      { _id: productData._id },
      productData,
      { new: true }
    );
    res.status(200).json({ message: "Product Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteProducts = async (req, res) => {
  let product_id = req.query.id;

  try {
    const result = await Products.findOneAndDelete({ _id: product_id });
    res.status(200).json({ message: "Product Removed" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  postProducts,
  putProducts,
  deleteProducts,
};
