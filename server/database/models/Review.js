const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  body: String,
  date: Date
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
