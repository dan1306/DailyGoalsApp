const GoalBody = require("../models/new");

module.exports = {
    addNewGoalBody
  };

async function addNewGoalBody(req, res) {
    console.log(req.body)

    let goalBody = new GoalBody()

  goalBody.title = req.body.title
  goalBody.userId = req.user.googleId

    goalBody = await goalBody.save()

    res.redirect("/")
}