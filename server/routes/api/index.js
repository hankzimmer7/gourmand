const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const dishRoutes = require("./dishes");
const userRoute = require("./users");

// Restaurant routes
router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
router.use("/users", userRoute);

module.exports = router;
