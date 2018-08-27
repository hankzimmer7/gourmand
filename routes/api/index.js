const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const dishRoutes = require("./dishes");

// Restaurant routes
router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);

module.exports = router;
