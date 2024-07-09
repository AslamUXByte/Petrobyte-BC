const mongoose = require("mongoose");

const fuelAccSchema = new mongoose.Schema({
  date: {
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
  fuel_price_selected: {
    type: Number,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("FuelAccount", fuelAccSchema);
