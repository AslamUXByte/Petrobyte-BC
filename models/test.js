const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  dispencer_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Dispencer',
  },
  fuel_quantity:{
    type:Number
  }
});

module.exports = mongoose.model("Test", testSchema);
