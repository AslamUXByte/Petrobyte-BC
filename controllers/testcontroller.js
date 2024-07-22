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
    if (test) {
      res.status(200).json({
        message: {
          count,
          test,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
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

    let checkExistingData = await Test.findOne({
      date: testData.date,
      dispencer_id: dispencerId._id,
    });

    if (checkExistingData) {
      return res.status(400).json({ message: "Test Alredy Added" });
    } else {
      let newLiveReading =
        parseFloat(dispencerId.live_reading) +
        parseFloat(testData.fuel_quantity);

      let saveData = await Test.create(testDataToSave);

      if (saveData) {
        let updateLiveReading = await Dispencer.findOneAndUpdate(
          { _id: dispencerId._id },
          { live_reading: newLiveReading },
          { new: true }
        );
        res.status(200).json({ message: "Test Added" });
      } else{ res.status(400).json({ message: "Failed, Try Again" })};
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

let deleteTest = async (req, res) => {
  try {
    let testData = req.body;
    const result = await Test.findOneAndDelete({ _id: testData._id });

    if (result) {
      let updateDispencerData = await Dispencer.findOne({
        _id: testData.dispencer_id._id,
      });

      let newReading =
        parseFloat(updateDispencerData.live_reading) -
        parseFloat(testData.fuel_quantity);

        console.log(updateDispencerData)
        console.log(newReading)

      let updateReading = await Dispencer.findOneAndUpdate(
        { _id: updateDispencerData._id },
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
  postTest,
  deleteTest,
};
