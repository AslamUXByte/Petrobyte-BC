const mongoose = require("mongoose");

const fuelAccSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Employee',
  },
  emp_from_time: {
    type: String,
  },
  emp_to_time: {
    type: String,
  },
  dispencer: {
    type: String,
  },
  fueltype: {
    type: String,
  },
  fuel_start_reading: {
    type: Number,
  },
  fuel_end_reading: {
    type: Number,
  },
  fuel_qty: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model("FuelAccount", fuelAccSchema);
