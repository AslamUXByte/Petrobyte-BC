const mongoose = require("mongoose");

const ccHistorySchema = new mongoose.Schema({
  date: {
    type: String,
  },
  cc_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'CreditCustomer',
  },
  vehicle_no: {
    type: String,
  },
  fuel_type: {
    type: String,
  },
  fuel_quantity: {
    type: String,
  },
  amount: {
    type: Number,
  },
  amount_type: {
    type: String,
  },
  emp_id:{
    type: mongoose.Schema.Types.ObjectId,ref:'Employee',
  },
  status: {
    type: String,
  },

});

module.exports = mongoose.model("CreditHistory", ccHistorySchema);
