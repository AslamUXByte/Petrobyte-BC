const ProductAccount = require("../models/productaccount");

let getProductAccountDetails = async (req, res) => {
  try {
    let productAccountDetails = await ProductAccount.find().populate('product_id');
    res.status(200).json({ message: productAccountDetails });
  } catch (error) {
    res.json(error);
  }
};

let getProductAccountDetailsById = async (req, res) => {
  let date = req.query.date;
  try {
    let productAccountDetails = await ProductAccount.find({ date: date }).populate('product_id');
    res.status(200).json({ message: productAccountDetails });
  } catch (error) {
    res.json(error);
  }
};

let postProductAccountDetails = async (req, res) => {
  let productDetails = req.body;
  try {
    for (let productDetail of productDetails) {
      let saveData = await ProductAccount.create(productDetail);
    }
    res.status(200).json({ message: "Saved" });
  } catch (error) {
    res.json(error);
  }
};

let putProductAccountDetails = async (req, res) => {
  let productDetails = req.body;
  try {
    const putData = await ProductAccount.findOneAndUpdate(
      { id: productDetails.id },
      productDetails,
      { new: true }
    );
    res.status(200).json({ message: "Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteProductAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await ProductAccount.findOneAndDelete({ id: id });
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProductAccountDetails,
  getProductAccountDetailsById,
  postProductAccountDetails,
  putProductAccountDetails,
  deleteProductAccountDetails,
};
