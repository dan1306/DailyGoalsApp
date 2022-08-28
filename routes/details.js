var express = require('express');
var router = express.Router();
var detailsCtrl = require('../controllers/details');

router.get('/:id', detailsCtrl.getDetails)

router.post("/:id/addGoal", detailsCtrl.addGoal)

router.get("/:id/checkIn", detailsCtrl.getcheckIn)

router.post("/:id/checkIn", detailsCtrl.addCheckIn)

module.exports = router