const db = require("../database/models");

// Defining methods for the controller
module.exports = {
  findAll: function(req, res) {
    db.Dish
      .find(req.query)
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Dish
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRestaurantId: function(req, res) {
    db.Dish
      .find({restaurant: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Dish
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Dish
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    db.Dish
      .deleteOne({ _id: req.params.id })
      .then(
        db.Review
          .deleteMany({dish_id: req.params.id })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      )
      .catch(err => res.status(422).json(err));
  }
};
