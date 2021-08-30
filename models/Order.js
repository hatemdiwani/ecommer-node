const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  livred: {
    type: Number,
    default: 1,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
}
 ,{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);