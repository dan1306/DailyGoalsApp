var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/:id", (req, res) => {
  res.render("Goals/checkIn", { id: req.params.id });
});

module.exports = router;
