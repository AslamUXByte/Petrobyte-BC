const mongoose = require("mongoose");

const cashManagementSchema = new mongoose.Schema({
  date: {
    type: String,
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
  status: {
    type: String,
  },
});

module.exports = mongoose.model("CashManagement", cashManagementSchema);
