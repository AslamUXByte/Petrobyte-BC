const mongoose = require("mongoose");

const dispencerSchema = new mongoose.Schema({
  dispencer_name: {
    type: String,
  },
  sub_dispencer_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'SubDispencer',
  },
  live_reading: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Dispencer", dispencerSchema);
