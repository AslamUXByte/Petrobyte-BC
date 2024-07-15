const Test = require("../models/test");
const Dispencer = require("../models/dispencer");

let getTest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let date = req.query.date;
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let test = await Test.find(query)
      .populate({
        path: "dispencer_id",
        populate: {
          path: "sub_dispencer_id",
        },
      })
      .skip(startIndex)
      .limit(limit);
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

    let newLiveReading =
      parseFloat(dispencerId.live_reading) + parseFloat(testData.fuel_quantity);

    let saveData = await Test.create(testDataToSave);

    if (saveData) {
      let updateLiveReading = await Dispencer.findOneAndUpdate(
        { _id: dispencerId._id },
        { live_reading: newLiveReading },
        { new: true }
      );
      res.status(200).json({ message: "Test Added" });
    } else res.status(400).json({ message: "Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Error, Try Again" });
  }
};

let deleteTest = async (req, res) => {
  
  try {
    let testData = req.body;
    const result = await Test.findOneAndDelete({ _id: test_id });

    if (result) {
      let dispencerId = await Dispencer.findOne({
        dispencer_name: testData.dispencer_name,
        sub_dispencer_id: testData.sub_dispencer_id,
      });

      let newReading =
        parseFloat(dispencerId.live_reading) -
        parseFloat(testData.live_reading);

      let updateReading = await Dispencer.findOneAndUpdate(
        { _id: dispencerId._id },
        { live_reading: newReading }
      );
      if (updateReading) res.status(200).json({ message: "Test Removed" });
    } else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

module.exports = {
  getTest,
  getTestById,
  postTest,
  deleteTest,
};
