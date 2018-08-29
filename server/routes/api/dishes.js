const router = require("express").Router();
const dishesController = require("../../controllers/dishesController");

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

module.exports = router;
