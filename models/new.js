const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkInSchema = new Schema({
    howIIsGoing: {
        type: String
    }
},{
  timestamps: true
})


const newSchema = new Scheam({
    title: {
        type: String
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }],
    checkIn: [checkInSchema],

},{
    timestamps: true
})

module.exports = mongoose.model('New', newSchema);