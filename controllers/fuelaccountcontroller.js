const FuelAccount = require("../models/fuelaccount");

let getFuelAccountDetails = async (req, res) => {
  try {
    let fuelDetails = await FuelAccount.find().populate("emp_id");
    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.json(error);
  }
};

let getFuelAccountDetailsById = async (req, res) => {
  let date = req.query.date;
  try {
    let fuelDetails = await FuelAccount.find({ date: date }).populate("emp_id");
    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.json(error);
  }
};

let postFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    for (let fuelDetail of fuelDetails) {
      let saveData = await FuelAccount.create(fuelDetail);
    }
    res.status(200).json({ message: "Saved" });
  } catch (error) {
    res.json(error);
  }
};

let putFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    const putData = await FuelAccount.findOneAndUpdate(
      { _id: fuelDetails._id },
      fuelDetails,
      { new: true }
    );
    res.status(200).json({ message: "Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteFuelAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await FuelAccount.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.json(error);
  }
};

const getFuelAccountOverview = async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  getFuelAccountDetails,
  getFuelAccountDetailsById,
  postFuelAccountDetails,
  putFuelAccountDetails,
  deleteFuelAccountDetails,
};
