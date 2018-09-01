const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  added_by: { type: Schema.Types.ObjectId, ref: 'User' },
  date_added: Date
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
