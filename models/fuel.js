const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema({
  fuel_name: {
    type: String,
  },
  fuel_price: {
    type: Number,
  },
  fuel_previous_price: {
    type: Number,
  },
  density: {
    type: String,
  },
  status: {
    type: String,
  }
});

module.exports = mongoose.model("Fuels", fuelSchema);
