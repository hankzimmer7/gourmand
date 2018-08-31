const router = require("express").Router();
// const restaurantRoutes = require("./restaurants");
// const dishRoutes = require("./dishes");
const apiRoutes = require("./apiRoutes");
const userRoutes = require("./userRoutes");
// const reviewRoutes = require('./reviews');

// router.use("/restaurants", restaurantRoutes);
// router.use("/dishes", dishRoutes);
router.use("/users", userRoutes);
router.use('/', apiRoutes);
// router.use("/reviews", reviewRoutes);

module.exports = router;
