const Products = require("../models/products");

let getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let product_name=req.query.name
    let query = {
      product_status:"ACTIVE"
    };

    if (product_name) {
      query.product_name = { $regex: product_name, $options: 'i' };
    }

    let products = await Products.find(query).skip(startIndex).limit(limit);
    let count =await Products.countDocuments({});
    res.status(200).json({ message: {
      count,
      products,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    }, });
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
    if(saveData) res.status(200).json({ message: "Product Added Successfully" });
    else res.status(400).json({ message: "Failed, try Again" });
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
    if(updateData) res.status(200).json({ message: "Product Details Updated" });
    else res.status(400).json({ message: "Action Failed, try Again" });
  } catch (error) {
    res.json(error);
  }
};

let deleteProducts = async (req, res) => {
  let product_id = req.query.id;

  try {
    const result = await Products.findOneAndDelete({ _id: product_id },{product_status:"DISABLED"});
    if(result) res.status(200).json({ message: "Product Removed" });
    else res.status(200).json({ message: "Action Failed, try Again" });
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
