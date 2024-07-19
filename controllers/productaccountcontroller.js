const ProductAccount = require("../models/productaccount");

let getProductAccountDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const startIndex = (page - 1) * limit;

    let date = req.query.date;
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let productAccount = await ProductAccount.find(query)
      .skip(startIndex)
      .limit(limit)
    let count = await ProductAccount.countDocuments({});

    if(productAccount){

      res.status(200).json({
        message: {
          count,
          productAccount,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    }else{
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let getProductAccountDetailsByDate = async (req, res) => {
  let date = req.query.date;
  try {
    let productAccountDetails = await ProductAccount.find({
      date: date,
    }).populate("product_id");
    if(productAccountDetails){

      res.status(200).json({ message: productAccountDetails });
    }else{
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
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
    res.status(400).json({ message: "Internal Error" });
  }
};

let putProductAccountDetails = async (req, res) => {
  let productDetails = req.body;
  try {
    const putData = await ProductAccount.findOneAndUpdate(
      { _id: productDetails.id },
      productDetails,
      { new: true }
    );
    if(putData) res.status(200).json({ message: "Details Updated" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let deleteProductAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await ProductAccount.findOneAndDelete({ _id: id });
    if(deleteData) res.status(200).json({ message: "Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

module.exports = {
  getProductAccountDetails,
  getProductAccountDetailsByDate,
  postProductAccountDetails,
  putProductAccountDetails,
  deleteProductAccountDetails,
};
