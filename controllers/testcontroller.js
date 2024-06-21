const Test = require("../models/test");

let getTest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // let product_name=req.query.name
    // let query = {};

    // if (product_name) {
    //   query.product_name = { $regex: product_name, $options: 'i' };
    // }

    let Test = await Test.find().skip(startIndex).limit(limit);
    let count =await Test.countDocuments({});
    res.status(200).json({ message: {
      count,
      Test,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    }, });
  } catch (error) {
    res.json(error);
  }
};

let getTestById = async (req, res) => {
  let product_id = req.query.id;
  try {
    let product = await Test.findOne({ _id: product_id });
    res.status(200).json({ message: product });
  } catch (error) {
    res.json(error);
  }
};

let postTest = async (req, res) => {
  let testData = req.body;
  try {
    let saveData = await Test.create(testData);
    res.status(200).json({ message: "Test Values Added Successfully" });
  } catch (error) {
    res.json(error);
  }
};

let putTest = async (req, res) => {
  let testData = req.body;
  try {
    const updateData = await Test.findOneAndUpdate(
      { _id: testData._id },
      testData,
      { new: true }
    );
    res.status(200).json({ message: "Test Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteTest = async (req, res) => {
  let test_id = req.query.id;

  try {
    const result = await Test.findOneAndDelete({ _id: test_id });
    res.status(200).json({ message: "Test Removed" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getTest,
  getTestById,
  postTest,
  putTest,
  deleteTest,
};
