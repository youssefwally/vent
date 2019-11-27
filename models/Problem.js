const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  problemType: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Problem',ProblemSchema);
