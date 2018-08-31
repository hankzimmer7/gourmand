const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  dish_id: { type: String, required: true },
  author_id: { type: String, required: true },
  rating: Number,
  body: { type: String, required: true },
  date: {type: Date, default: Date.now}
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
