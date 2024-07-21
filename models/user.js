const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contact_no: {
    type: String,
  },
  role: {
    type: String,
  },

});

module.exports = mongoose.model("User", userSchema);