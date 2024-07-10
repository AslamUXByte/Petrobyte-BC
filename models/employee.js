const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  emp_name: {
    type: String,
  },
  emp_email: {
    type: String,
  },
  emp_contact_no: {
    type: String,
  },
  emp_address: {
    type: String,
  },
  emp_age: {
    type: Number,
  },
  emp_status: {
    type: String,
    default:"ACTIVE"
  },
});

module.exports = mongoose.model("Employee", empSchema);
