const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  reviews: [ { type:Schema.Types.ObjectId, ref: 'Review' } ],
  added_by: { type: Schema.Types.ObjectId, ref: 'User' },
  date_added: Date
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
