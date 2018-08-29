const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Restaurants collection and inserts the restaurants below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gourmandDB"
);

const restaurantSeed = [{
    "name": "Umma's House",
    "description": "Japanese Korean Restaurant"
  },
  {
    "name": "Waffle House",
    "description": "Breakfast Restaurant"
  },
  {
    "name": "Moe's Southwest Grill",
    "description": "Counter-serve chain for burritoes"
  },
  {
    "name": "Subway",
    "description": "Sandwich chain"
  }
];

const dishSeed = [{
    "name": "Crunchy Dragon Role",
    "description": "Eel, Fish roe, Tempura flake top on California roll"
  },
  {
    "name": "Spicy Chicken Bento",
    "description": "Spicy marinated deep fried chicken. 4 Pieces of California roll, Salad, Egg Roll, Steamed Rice"
  },
  {
    "name": "Bibimbob",
    "description": "Seasoned beef, Stir fried 5 types Vegetables. Mushroom, Carrot, Bean Sprout, Radish, Sweet Potato Stem, Royal Fern Pepper Paste, Egg etc."
  },
  {
    "name": "Korean Beef BBQ Bento",
    "description": "Marinated Thin Sliced Rib eye steak, Onion and Carrot. 4 Pieces of California roll, Salad, Egg Roll, Steamed Rice"
  }
];

const userSeed = [{
    "username": "Hank",
    "password": "sushi"
  },
  {
    "username": "Cloud",
    "password": "buster"
  },
  {
    "username": "Tifa",
    "password": "gloves"
  }
];

let dishSeedingDone = false;
let restaurantSeedingDone = false;
let userSeedingDone = false;

db.Restaurant
  .remove({})
  .then(() => db.Restaurant.collection.insertMany(restaurantSeed))
  .then(data => {
    console.log(data.result.n + " restaurant records inserted!");
    restaurantSeedingDone = true;
    exitIfDone();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Dish
  .remove({})
  .then(() => db.Dish.collection.insertMany(dishSeed))
  .then(data => {
    console.log(data.result.n + " dish records inserted!");
    dishSeedingDone = true;
    exitIfDone();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " user records inserted!");
    userSeedingDone = true;
    exitIfDone();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function exitIfDone() {
  if (restaurantSeedingDone && dishSeedingDone && userSeedingDone) {
    process.exit(0);
  }
}