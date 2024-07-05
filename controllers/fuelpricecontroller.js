const Fuels = require("../models/fuel");

let getFuels = async (req, res) => {
  try {
    let fuelDetails = await Fuels.find();
    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.json(error);
  }
};

let getFuelsById = async (req, res) => {
  let fuelId = req.query.id;
  try {
    let fuelDetails = await Fuels.findOne({ _id: fuelId });
    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.json(error);
  }
};

let postFuels = async (req, res) => {
  let fuelsData = req.body;
  try {
    let fuels = await Fuels.create(fuelsData);
    res.status(200).json({ message: "Inserted" });
  } catch (error) {
    res.json(error);
  }
};

let putFuels = async (req, res) => {
  let fuelsData = req.body;
  try {
    const updateData = await Fuels.findOneAndUpdate(
      { _id: fuelsData._id },
      { fuel_price: fuelsData.fuelPrice },
      { new: true }
    );
    res.status(200).json({ message: "Fuel Price Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteFuels = async (req, res) => {
  
  try {
    let fuelId = req.query.id;
    const deleteFuel = await Fuels.findOneAndDelete({ _id: fuelId });
    if(deleteFuel) res.status(200).json({ message: "Fuel Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

module.exports = { getFuels, getFuelsById, postFuels, putFuels, deleteFuels };
