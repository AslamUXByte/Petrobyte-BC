const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  expence_type: {
    type: String,
  },
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Employee',
  },
  expence_amount: {
    type: Number,
  },
  comments: {
    type: Number,
  },
});

module.exports = mongoose.model("Expence", expenceSchema);
