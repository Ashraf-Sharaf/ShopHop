const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  backgroundColor: String,
  iconColor: String,
  cardColor: String
});

module.exports = mongoose.model("Category", categorySchema);
