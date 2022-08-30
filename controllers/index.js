const GoalBody = require("../models/new");

module.exports = {
    getGoals,
    deleteGoalBody,
};

async function getGoals(req, res) {
  if (req.user) {
    let goals = await GoalBody.find({ userId :req.user.googleId});
    console.log(goals, req.user);
  
    res.render("Goals/index", {
      Goals: goals,
      user: req.user
    });
  } else {
    res.render("Goals/index", {
      Goals: [],
      user: req.user
    });
  }

}


async function deleteGoalBody (req, res) {
    console.log(req.params.id )

    await GoalBody.findByIdAndDelete({ _id: req.params.id })
    
    res.redirect("/")

}


