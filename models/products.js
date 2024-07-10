const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  product_type: {
    type: String,
  },
  product_status: {
    type: String,
    default:"ACTIVE"
  },
});

module.exports = mongoose.model("Products", productSchema);
