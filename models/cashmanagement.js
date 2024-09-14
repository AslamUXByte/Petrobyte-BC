const mongoose = require("mongoose");

const cashManagementSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  total_amount: {
    type: Number,
  },
  cash_inhand: {
    type: Number,
  },
  cash_bank: {
    type: Number,
  },
  cash_other: {
    type: Number,
  },
  credit_amount: {
    type: Number,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("CashManagement", cashManagementSchema);
