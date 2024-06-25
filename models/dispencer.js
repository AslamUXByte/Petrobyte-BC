const mongoose = require("mongoose");

const ccSchema = new mongoose.Schema({
  dispencer: {
    type: String,
  },
  sub_dispencer: {
    type: String,
  },
  fuel_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Fuels',
  },
  live_reading: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Dispencer", ccSchema);
