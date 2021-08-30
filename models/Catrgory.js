const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: true,
  },
  icon: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Category", categorySchema);