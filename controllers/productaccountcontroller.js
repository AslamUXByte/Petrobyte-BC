const ProductAccount = require("../models/productaccount");

let getProductAccountDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const startIndex = (page - 1) * limit;

    let fuelDetails = await ProductAccount.find()
      .skip(startIndex)
      .limit(limit)
      .populate("product_id");
    let count = await ProductAccount.countDocuments({});

    res.status(200).json({
      message: {
        count,
        fuelDetails,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.json(error);
  }
};

let getProductAccountDetailsByDate = async (req, res) => {
  let date = req.query.date;
  try {
    let productAccountDetails = await ProductAccount.find({
      date: date,
    }).populate("product_id");
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
      { _id: productDetails.id },
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
    const deleteData = await ProductAccount.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProductAccountDetails,
  getProductAccountDetailsByDate,
  postProductAccountDetails,
  putProductAccountDetails,
  deleteProductAccountDetails,
};
