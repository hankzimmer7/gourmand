const router = require("express").Router();

router.route("/")
  .post(function(req,res) {
    console.log(req.body);
  });

module.exports = router;