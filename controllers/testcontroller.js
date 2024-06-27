const Test = require("../models/test");
const Dispencer = require("../models/dispencer");

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

    let test = await Test.find().skip(startIndex).limit(limit);
    let count = await Test.countDocuments({});
    res.status(200).json({
      message: {
        count,
        test,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.json(error);
  }
};

let getTestById = async (req, res) => {
  let test_id = req.query.id;
  try {
    let test = await Test.findOne({ _id: test_id });
    res.status(200).json({ message: test });
  } catch (error) {
    res.json(error);
  }
};

let postTest = async (req, res) => {
  try {
    let testData = req.body;
    let dispencerName = testData.dispencer_name;
    let subDispencerId = testData.sub_dispencer_id;
    let dispencerId = await Dispencer.findOne({
      dispencer_name: dispencerName,
      sub_dispencer_id: subDispencerId,
    });

    let testDataToSave = {
      date: testData.date,
      dispencer_id: dispencerId._id,
      fuel_quantity: testData.fuel_quantity,
    };

    let newLiveReading = dispencerId.live_reading + testData.fuel_quantity;

    let saveData = await Test.create(testDataToSave);

    let updateLiveReading = await Dispencer.findOneAndUpdate(
      { _id: dispencerId._id },
      { live_reading: newLiveReading },
      { new: true }
    );
    res.status(200).json({ message: { saveData, updateLiveReading } });
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
