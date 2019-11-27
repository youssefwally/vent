const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  problem: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Problem',ProblemSchema);
