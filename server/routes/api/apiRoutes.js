const router = require("express").Router();
const restaurantsController = require("../../controllers/restaurantsController");
const dishesController = require("../../controllers/dishesController");
const reviewsController = require("../../controllers/reviewsController");

// Matches with "/api/restaurants"
router.route("/restaurants")
  .get(restaurantsController.findAll)
  .post(restaurantsController.create);

// Matches with "/api/restaurants/:id"
router
  .route("/restaurants/:id")
  .get(restaurantsController.findById)
  .put(restaurantsController.update)
  .delete(restaurantsController.remove);

// Matches with "/api/restaurants/:id/dishes"
router
  .route("/restaurants/:id/dishes")
  .get(dishesController.findByRestaurantId);

// Matches with "/api/dishes"
router.route("/dishes")
  .get(dishesController.findAll)
  .post(dishesController.create);

// Matches with "/api/dishes/:id"
router
  .route("/dishes/:id")
  .get(dishesController.findById)
  .put(dishesController.update)
  .delete(dishesController.delete);

// Matches with "/api/dishes/:dishId/reviews"
router.route("/dishes/:dishId/reviews")
.get(reviewsController.findByDishId)


// Matches with "/api/reviews"
router.route("/reviews")
  .get(reviewsController.findAll)
  .post(reviewsController.create);

// Matches with "/api/reviews/:id"
router
  .route("/reviews/:id")
  .get(reviewsController.findById)
  .put(reviewsController.update)
  .delete(reviewsController.remove);


module.exports = router;
