const GoalBody = require("../models/new");
const Goal = require("../models/goals");

module.exports = {
  getDetails,
  addGoal,
  getcheckIn,
  addCheckIn,
  deleteGoal,
  getEdit,
  saveEdit,
  editCheck,
};

async function getDetails(req, res) {
  let id = req.params.id;

  let details = await GoalBody.findById(req.params.id);
  details = await details.populate("goals");

  res.render("Goals/details", {
    details,
    id,
    user: req.user,
  });
}

async function addGoal(req, res) {
  let newGoal = new Goal();
  newGoal.goal = req.body.goal;
  newGoal.identify = req.params.id;
  newGoal = await newGoal.save();

  let goal = await GoalBody.findById(req.params.id);
  goal.goals.push(newGoal._id);
  goal = await goal.save();

  res.redirect("/detail/" + req.params.id);
}

async function getcheckIn(req, res) {
  let details = await GoalBody.findById(req.params.id);

  res.render("Goals/checkIn", {
    id: req.params.id,
    details,
    user: req.user,
  });
}

async function addCheckIn(req, res) {
  let goal = await GoalBody.findById(req.params.id);
  goal.checkIn.push(req.body);
  goal = await goal.save();

  res.redirect("/detail/" + req.params.id + "/checkIn");
}

async function deleteGoal(req, res) {
    let goalBody = await GoalBody.findById(req.params.id);

    for (let i = 0; i < goalBody.goals.length; i++) {
        if (goalBody.goals[i]._id.toString() == req.body.id) {
            goalBody.goals.splice(i, 1);
        }
    }

    goalBody = await goalBody.save();

    await Goal.findByIdAndDelete(req.body.id);

    res.redirect("/detail/" + req.params.id);
}

async function getEdit(req, res) {
    let home = req.params.home;

    let id = req.params.id;

    let detail = await GoalBody.findById(req.params.home);

    let goal = await Goal.findById(id);

    res.render("Goals/edit", {
        home,
        id,
        goal,
        detail,
        user: req.user,
    });
}

async function saveEdit(req, res) {
    let home = req.params.home;
    
    let id = req.params.id;
    
    let edit = req.body.goalEdit;

    let goal = await Goal.findById(id);
    goal.goal = edit;
    goal.completed = false;
    goal = await goal.save();

    res.redirect("/detail/" + home);
}

async function editCheck(req, res) {
    let goal = await Goal.findById(req.params.goalId);

    if (goal.completed == true) {
        goal.completed = false;
    } else if (goal.completed == false) {
        goal.completed = true;
    }

    goal = await goal.save();
        
    res.redirect("/detail/" + req.params.id);
}
