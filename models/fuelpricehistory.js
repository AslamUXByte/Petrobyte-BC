const mongoose = require("mongoose");

const fuelsPriceHistorySchema = new mongoose.Schema({
  date: {
    type: String,
  },
  fuel_petrol_price: {
    type: Number,
  },
  fuel_diesel_price: {
    type: Number,
  },
  fuel_other_price: {
    type: Number,
  },
  status: {
    type: String,
  }
});

module.exports = mongoose.model("FuelsPriceHistory", fuelsPriceHistorySchema);
