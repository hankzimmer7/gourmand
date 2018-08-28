const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const dishRoutes = require("./dishes");
const loginRoute = require("./login");

// Restaurant routes
router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
router.use("/login", loginRoute);

module.exports = router;
