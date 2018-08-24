const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gourmandDB"
);

const restaurantSeed = [
  {
    name: "Umma's House",
    description: "Japanese Korean Restaurant"
  },
  {
    name: "Waffle House",
    description: "Breakfast Restaurant"
  },
  {
    name: "Moe's Southwest Grill",
    description: "Counter-serve chain for burritoes"
  }
 ];

db.Restaurant
  .remove({})
  .then(() => db.Restaurant.collection.insertMany(restaurantSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
