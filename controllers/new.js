const GoalBody = require("../models/new");

module.exports = {
  addNewGoalBody,
};

async function addNewGoalBody(req, res) {
  let goalBody = new GoalBody();
  goalBody.title = req.body.title;
  goalBody.userId = req.user.googleId;
  goalBody.email = req.user.email;
  goalBody = await goalBody.save();

  res.redirect("/");
}
