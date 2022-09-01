var express = require("express");
var router = express.Router();

router.get("/:id", (req, res) => {
  res.render("Goals/checkIn", { id: req.params.id });
});

module.exports = router;
