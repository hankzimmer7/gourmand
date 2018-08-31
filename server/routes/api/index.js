const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const dishRoutes = require("./dishes");
const userRoutes = require("./users");
const reviewRoutes = require('./reviews');

// Restaurant routes
router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
