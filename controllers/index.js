const GoalBody = require("../models/new");

module.exports = {
    getGoals,
    deleteGoalBody,
};

async function getGoals(req, res) {
  let goals = await GoalBody.find({});
  console.log(goals);

  res.render("Goals/index", { Goals: goals });
}


async function deleteGoalBody (req, res) {
    console.log(req.params.id )

    await GoalBody.findByIdAndDelete({ _id: req.params.id })
    
    res.redirect("/")

}


