const moment = require("moment");
const Fuels = require("../models/fuel");
const FuelsPriceHistory = require("../models/fuelpricehistory");

const getFuels = async (req, res) => {
  try {
    let fuelDetails = await Fuels.find();
    if (fuelDetails) {
      res.status(200).json({ message: fuelDetails });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "No Data" });
  }
};

const postFuels = async (req, res) => {
  let fuelsData = req.body;
  try {
    let fuels = await Fuels.create(fuelsData);
    if (fuels) res.status(200).json({ message: "Inserted" });
    else res.status(400).json({ message: "Failed" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

const putFuels = async (req, res) => {
  let fuelsData = req.body;
  try {
    const updateData = await Fuels.findOneAndUpdate(
      { _id: fuelsData._id },
      {
        fuel_price: fuelsData.fuel_price,
        fuel_previous_price: fuelsData.fuel_previous_price,
      },
      { new: true }
    );
    if (updateData) res.status(200).json({ message: "Fuel Price Updated" });
    else res.status(400).json({ message: "Fuel Price Updated" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

const deleteFuels = async (req, res) => {
  try {
    let fuelId = req.query.id;
    const deleteFuel = await Fuels.findOneAndDelete({ _id: fuelId });
    if (deleteFuel) res.status(200).json({ message: "Fuel Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

const postfuelPriceHistoryByDate = async () => {
  try {
    let fuelPrice = await Fuels.find();
    const todayDate = moment().format("DD/MM/YYYY");

    let fuelsData = {
      date: todayDate,
      fuel_petrol_price: fuelPrice[1].fuel_price,
      fuel_diesel_price: fuelPrice[0].fuel_price,
      fuel_other_price: 0,
    };

    let fuels = await FuelsPriceHistory.create(fuelsData);
  } catch (error) {}
};

const getfuelPriceHistoryByDate = async (req, res) => {
  try {
    const date = req.query.date;
    let fuelDetails = await FuelsPriceHistory.find({ date: date });
    if (fuelDetails) {
      res.status(200).json({ message: fuelDetails });
    } else {
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "No Data" });
  }
};

module.exports = {
  getFuels,
  postFuels,
  putFuels,
  deleteFuels,
  postfuelPriceHistoryByDate,
  getfuelPriceHistoryByDate,
};
