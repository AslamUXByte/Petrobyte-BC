const mongoose = require("mongoose");

const ccSchema = new mongoose.Schema({
  cc_name: {
    type: String,
  },
  cc_contact_no: {
    type: String,
  },
  cc_address: {
    type: String,
  },
  cc_email: {
    type: Number,
  },
  credit_amount: {
    type: Number,
  },
  cc_status: {
    type: String,
  },
});

module.exports = mongoose.model("CreditCustomer", ccSchema);
