const router = require("express").Router();
const dishesController = require("../../controllers/dishesController");
const reviewsController = require("../../controllers/reviewsController");


// Matches with "/api/dishes"
router.route("/")
  .get(dishesController.findAll)
  .post(dishesController.create);

// Matches with "/api/dishes/:id"
router
  .route("/:id")
  .get(dishesController.findById)
  .put(dishesController.update)
  .delete(dishesController.remove);

  // Matches with "/api/dishes/:dishId/reviews"
router.route("/:dishId/reviews")
.get(reviewsController.findByDishId)

module.exports = router;
