const mongoose = require("mongoose");

const ccSchema = new mongoose.Schema({
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
    type: Number,
  },
  amount_type: {
    type: Number,
  },
  amount: {
    type: String,
  },
  status: {
    type: String,
  },

});

module.exports = mongoose.model("CreditHistory", ccSchema);
