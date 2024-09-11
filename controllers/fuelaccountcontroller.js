const FuelAccount = require("../models/fuelaccount");
const Dispencer = require("../models/dispencer");

let getFuelAccountDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const startIndex = (page - 1) * limit;

    let date = req.query.date;
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let fuelDetails = await FuelAccount.find(query)
      .populate("sub_dispencer_id")
      .skip(startIndex)
      .limit(limit);
    let count = await FuelAccount.countDocuments({});

    if (fuelDetails) {
      res.status(200).json({
        message: {
          count,
          fuelDetails,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let getFuelAccountDetailsByDate = async (req, res) => {
  try {
    const date = req.query.date;
    const dispencer = req.query.dispencer;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const startIndex = (page - 1) * limit;

    let fuelDetails = await FuelAccount.find({
      date: date,
      dispencer_name: dispencer,
    })
      .populate("sub_dispencer_id")
      .skip(startIndex)
      .limit(limit);

    let count = await FuelAccount.countDocuments({});

    if (fuelDetails) {
      res.status(200).json({
        message: {
          count,
          fuelDetails,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let postFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    for (let fuelDetail of fuelDetails) {
      let saveData = await FuelAccount.create(fuelDetail);

      let dispencerData = await Dispencer.find({
        dispencer_name: fuelDetail.dispencer_name,
        sub_dispencer_id: fuelDetail.sub_dispencer_id,
      });

      let updateReading = await Dispencer.updateOne(
        { _id: dispencerData[0]._id },
        { live_reading: fuelDetail.fuel_end_reading }
      );
    }
    res.status(200).json({ message: "Saved" });
  } catch (error) {
    res.status(400).json({ message: "Error, Try Again" });
  }
};

let putFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    let dispencerData = await Dispencer.find({
      dispencer_name: fuelDetails.dispencer_name,
      sub_dispencer_id: fuelDetails.sub_dispencer_id,
    });

    let difference = 0.0;
    let updatedReading = 0.0;
    if (dispencerData.live_reading > fuelDetails.fuel_end_reading) {
      difference =
        parseFloat(dispencerData.live_reading) -
        parseFloat(fuelDetails.fuel_end_reading);
      updatedReading =
        parseFloat(dispencerData.live_reading) - parseFloat(difference);
    }
    if (dispencerData.live_reading < fuelDetails.fuel_end_reading) {
      difference =
        parseFloat(fuelDetails.fuel_end_reading) -
        parseFloat(dispencerData.live_reading);
      updatedReading =
        parseFloat(dispencerData.live_reading) + parseFloat(difference);
    }
    const putData = await FuelAccount.findOneAndUpdate(
      { _id: fuelDetails._id },
      fuelDetails,
      { new: true }
    );
    if (putData) {
      let updateReading = await Dispencer.updateOne(
        { _id: dispencerData._id },
        { live_reading: updatedReading }
      );
    }
    if (putData) res.status(200).json({ message: "Details Updated" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Error, Try Again" });
  }
};

let deleteFuelAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await FuelAccount.findOneAndDelete({ _id: id });
    if (deleteData) res.status(200).json({ message: "Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Error, Try Again" });
  }
};

const getFuelAccountOverview = async (req, res) => {
  try {
    let date = req.query.date;
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let fuelDetails = await FuelAccount.find(query);

    const groupedData = fuelDetails.reduce(
      (acc, { date, dispencer_name, amount }) => {
        const key = `${date}-${dispencer_name}`;
        acc[key] = acc[key] || { date, dispencer_name, total_amount: 0 };
        acc[key].total_amount += amount;
        return acc;
      },
      {}
    );

    // Converting the grouped data back to an array
    const result = Object.values(groupedData);

    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ message: "No Data" });
  }
};

const getFuelAccountByStaff = async (req, res) => {
  try {
    const date = req.query.date;
    const name = req.query.name;
    const query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
      query.name = { $regex: name, $options: "i" };
    }

    const fuelDetails = await FuelAccount.find(query);

    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.status(400).json({ message: "No Data" });
  }
};

module.exports = {
  getFuelAccountDetails,
  getFuelAccountDetailsByDate,
  postFuelAccountDetails,
  putFuelAccountDetails,
  deleteFuelAccountDetails,
  getFuelAccountOverview,
  getFuelAccountByStaff,
};
