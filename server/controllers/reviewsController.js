const db = require("../database/models");

// Defining methods for the controller
module.exports = {
  findAll: function (req, res) {
    db.Review
      .find(req.query)
      .sort({
        date: 1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Review
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByDishId: function (req, res) {
    db.Review
      .find({
        dish: req.params.dishId
      })
      .populate('author')
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    db.Review
      .find({
        author: req.params.userId
      })
      .populate('dish')
      .populate("restaurant")
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Review
      .create(req.body)
      .then(dbReview => {
        return db.Dish.findOneAndUpdate({
          _id: dbReview.dish
        }, {
          $push: {
            reviews: dbReview._id
          }
        }, { new: true });
      })
      .then(dbDish => {
        res.json(dbDish);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Review
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Review
      .deleteOne({
        _id: req.params.id
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};