const GoalBody = require("../models/new");

module.exports = {
    getGoals,
    deleteGoalBody,
};

async function getGoals(req, res) {
  let goals = await GoalBody.find({});
  console.log(goals, req.user);

  // for (let i = 0; i < goals.length)
  // goals.map((val) => {
  //   await val.populate("goals")
  // })

  // console.log(goals)

  res.render("Goals/index", {
    Goals: goals,
    user: req.user
  });
}


async function deleteGoalBody (req, res) {
    console.log(req.params.id )

    await GoalBody.findByIdAndDelete({ _id: req.params.id })
    
    res.redirect("/")

}


