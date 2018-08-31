const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  restaurant_id: String,
  added_by: String,
  date_added: Date
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
