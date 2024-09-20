const mongoose = require("mongoose");

const fuelAccSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  from_time: {
    type: String,
  },
  to_time: {
    type: String,
  },
  dispencer_name: {
    type: String,
  },
  sub_dispencer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubDispencer",
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
  cash_inhand: {
    type: Number,
  },
  cash_bank: {
    type: Number,
  },
  cash_other: {
    type: Number,
  },
  cash_credit: {
    type: Number,
  },
  fuel_price_selected: {
    type: Number,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("FuelAccount", fuelAccSchema);
