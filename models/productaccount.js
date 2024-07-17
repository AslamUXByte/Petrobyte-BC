const mongoose = require("mongoose");

const productAccSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  quantity: {
    type: String,
  },
  total_amount: {
    type: String,
  },
});

module.exports = mongoose.model("ProductAccount", productAccSchema);
