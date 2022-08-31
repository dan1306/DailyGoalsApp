const GoalBody = require("../models/new");
const Goal = require("../models/goals");

module.exports = {
  getGoals,
  deleteGoalBody,
};

async function getGoals(req, res) {
  if (req.user) {
    let goals = await GoalBody.find({ userId: req.user.googleId });
    res.render("Goals/index", {
      Goals: goals,
      user: req.user,
    });
  } else {
    res.render("Goals/index", {
      Goals: [],
      user: req.user,
    });
  }
}

async function deleteGoalBody(req, res) {
  let goalsToBeDeleted = await Goal.find({ identify: req.params.id });

  if (goalsToBeDeleted) {
    await Goal.deleteMany({ identify: req.params.id });
  }

  await GoalBody.findByIdAndDelete({ _id: req.params.id });

  res.redirect("/");
}
