const Fuels = require("../models/fuel");

let getFuels = async (req, res) => {
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

let postFuels = async (req, res) => {
  let fuelsData = req.body;
  try {
    let fuels = await Fuels.create(fuelsData);
    if (fuels) res.status(200).json({ message: "Inserted" });
    else res.status(400).json({ message: "Failed" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let putFuels = async (req, res) => {
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

let deleteFuels = async (req, res) => {
  try {
    let fuelId = req.query.id;
    const deleteFuel = await Fuels.findOneAndDelete({ _id: fuelId });
    if (deleteFuel) res.status(200).json({ message: "Fuel Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

module.exports = { getFuels, postFuels, putFuels, deleteFuels };
