const mongoose = require("mongoose");

const subDispencerSchema = new mongoose.Schema({
  sub_dispencer: {
    type: String,
  },
  fuel_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Fuels',
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("SubDispencer", subDispencerSchema);
