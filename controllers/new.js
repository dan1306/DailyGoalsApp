const GoalBody = require("../models/new");
module.exports = {
    addNewGoalBody
  };

async function addNewGoalBody(req, res) {

    let goalBody = new GoalBody()
    
    goalBody.title = req.body.title

    goalBody = await goalBody.save()

    res.redirect("/")
}