const db = require("../database/models");

// Defining methods for the controller
module.exports = {
  findAll: function(req, res) {
    db.Restaurant
      .find(req.query)
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Restaurant
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByTerm: function(req, res) {
    db.Restaurant
      .find({name: {"$regex": req.params.term, "$options": "i"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Restaurant
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Restaurant
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    db.Restaurant
      .deleteOne({ _id: req.params.id })
      .then(
        db.Dish
        .deleteMany({ restaurant: req.params.id })
        .then(
          db.Review
            .deleteMany({restaurant: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
        )
        .catch(err => res.status(422).json(err))
      )
      .catch(err => res.status(422).json(err));
  }
};
