const GoalBody = require("../models/new");

module.exports = {
  getGoals
};

async function getGoals(req, res) {
  let goals = await GoalBody.find({});
  console.log(goals);

  res.render("Goals/index", { Goals: goals });
}
