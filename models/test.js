const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  dispenser: {
    type: mongoose.Schema.Types.ObjectId,ref:'Dispencer',
  },
  fuel: {
    type: mongoose.Schema.Types.ObjectId,ref:'Fuels',
  },
  fuel_quantity:{
    type:Number
  }
});

module.exports = mongoose.model("Test", testSchema);
