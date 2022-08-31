const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  goal: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  identify: String,
});

module.exports = mongoose.model("Goal", goalSchema);
