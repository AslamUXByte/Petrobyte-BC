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
  cc_status: {
    type: Number,
  },
});

module.exports = mongoose.model("CreditCustomer", ccSchema);
