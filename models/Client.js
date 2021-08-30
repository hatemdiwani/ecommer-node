const mongoose = require("mongoose");
const User = require("../models/User");

const clientSchema = new mongoose.Schema({
  cin: {
    type: Number,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = User.discriminator("client", clientSchema);

//
