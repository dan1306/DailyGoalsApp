var express = require('express');
var router = express.Router();
var detailsCtrl = require('../controllers/details');

router.get('/:id', detailsCtrl.getDetails)

router.post("/:id/addGoal", detailsCtrl.addGoal)

router.get("/:id/checkIn", detailsCtrl.getcheckIn)

router.post("/:id/checkIn", detailsCtrl.addCheckIn)

router.delete("/:id/deleteGoal", detailsCtrl.deleteGoal)

router.get('/:home/edit/:id', detailsCtrl.getEdit)

module.exports = router