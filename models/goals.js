const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const goalSchema = new Schema({
    goal: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Goal', goalSchema);