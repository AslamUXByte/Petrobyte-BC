const mongoose = require("mongoose");

const productAccSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,ref:'Products',
  },
  quantity: {
    type: String,
  },
  total_amount: {
    type: String,
  },
});

module.exports = mongoose.model("ProductAccount", productAccSchema);
