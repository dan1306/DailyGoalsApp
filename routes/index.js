var express = require("express");
var router = express.Router();
var indexCtrl = require("../controllers/index");
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    res.redirect("/");
  });
});

router.get("/", indexCtrl.getGoals);

router.delete("/:id/delete", indexCtrl.deleteGoalBody);

module.exports = router;
