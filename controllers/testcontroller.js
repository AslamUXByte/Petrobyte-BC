const Test = require("../models/test");
const Dispencer = require("../models/dispencer");

let getTest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let date=req.query.date
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: 'i' };
    }

    let test = await Test.find(query).populate({
      path: "dispencer_id",
      populate: {
        path: "sub_dispencer_id",
      },
    }).skip(startIndex).limit(limit);
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

    let newLiveReading = parseFloat(dispencerId.live_reading) + parseFloat(testData.fuel_quantity);

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
    if(updateData) res.status(200).json({ message: "Test Details Updated" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

let deleteTest = async (req, res) => {
  let test_id = req.query.id;
  let testData = req.body;

  try {
    const result = await Test.findOneAndDelete({ _id: test_id });

    // let dispencerId = await Dispencer.findOne({
    //   dispencer_name: dispencerName,
    //   sub_dispencer_id: subDispencerId,
    // });

    if(result) res.status(200).json({ message: "Test Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

module.exports = {
  getTest,
  getTestById,
  postTest,
  putTest,
  deleteTest,
};
