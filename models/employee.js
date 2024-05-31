const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  emp_name: {
    type: String,
  },
  emp_email: {
    type: String,
    unique: true,
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
});

module.exports = mongoose.model("Employee", empSchema);
