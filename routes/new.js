var express = require('express');
var router = express.Router();
var newCtrl = require('../controllers/new');


router.get("/", (req, res) => {
    res.render("Goals/new", {
        user: req.user
    })
})

router.post('/', newCtrl.addNewGoalBody)

module.exports = router;
