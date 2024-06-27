const mongoose = require("mongoose");

const expenceAccSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  expence_type: {
    type: String,
  },
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  expence_amount: {
    type: Number,
  },
  expence_comment:{
    type: String,
  }
});

module.exports = mongoose.model("ExpenceAccount", expenceAccSchema);
