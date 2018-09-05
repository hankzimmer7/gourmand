const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);
router.use('/', apiRoutes);

module.exports = router;
