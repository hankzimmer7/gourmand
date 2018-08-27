const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
