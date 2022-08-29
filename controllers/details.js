const GoalBody = require("../models/new");
const Goal = require("../models/goals")

module.exports = {
    getDetails,
    addGoal,
    getcheckIn,
    addCheckIn,
    deleteGoal,
    getEdit,
    saveEdit
}


async function getDetails(req, res) {
    let id = req.params.id

    let details = await GoalBody.findById(id)
    details = await details.populate('goals')
    console.log(details)
    res.render('Goals/details', {
        details,
        id
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

async function deleteGoal(req, res) {

    console.log(req.body)
    
    let goalBody = await GoalBody.findById(req.params.id)

    // goalBody = await goalBody.populate('goals')

    for (let i = 0; i < goalBody.goals.length; i++){

        if (goalBody.goals[i]._id.toString() == req.body.id) {
            console.log(goalBody.goals[i]._id.toString(), "hiiiii")
            goalBody.goals.splice(i, 1)
        }
        
        
    }

    goalBody = await goalBody.save()

    await Goal.findByIdAndDelete(req.body.id)

    //  goalBody.goals.map(req.body.id)

    console.log("Daniel", goalBody.goals)

    res.redirect('/detail/' + req.params.id)
    

}



async function getEdit(req, res) {
    console.log(req.params)
    let home = req.params.home
    let id = req.params.id

    let goal = await Goal.findById(id)
    console.log( "Goals: ", goal)
    res.render("Goals/edit", {
        home,
        id,
        goal
    })
}

async function saveEdit(req, res) {

    let home = req.params.home
    let id = req.params.id
    let edit = req.body.goalEdit

    let goal = await Goal.findById(id)
    goal.goal = edit
    goal = await goal.save()

    res.redirect("/detail/" + home)

    
}