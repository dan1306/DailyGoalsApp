const GoalBody = require("../models/new");
const Goal = require("../models/goals")

module.exports = {
    getDetails,
    addGoal,
    getcheckIn,
    addCheckIn
}


async function getDetails(req, res) {
    let id = req.params.id

    let details = await GoalBody.findById(id)
    details = await details.populate('goals')
    console.log(details)
    res.render('Goals/details', {
        details
    })
}


async function addGoal(req, res) {

    let newGoal = new Goal()
    newGoal.goal = req.body.goal
    newGoal = await newGoal.save()
    
    console.log(req.body)

    let goal = await GoalBody.findById(req.params.id)
    console.log(goal)
    goal.goals.push(newGoal._id)
    goal = await goal.save()
    console.log(goal)
    
    res.redirect("/detail/" + req.params.id)
    
}


async function getcheckIn(req, res) {
    
    res.render('Goals/checkIn', {
        id: req.params.id
    })
}


async function addCheckIn(req, res) {
    console.log(req.body)
    let goal = await GoalBody.findById(req.params.id)
    goal.checkIn.push(req.body)
    goal = await goal.save()

    res.redirect("/detail/" + req.params.id)

}