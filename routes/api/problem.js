// Dependencies
const express = require('express')
const router = express.Router()
const Problem = require('../../models/Problem')

router.get("/vProblems", async (req, res) => {
    const problems = await Problem.find();
    res.json({ data: problems });
  });


  router.post('/aProblems', async (req, res) => {
    const {
      problemType
    } = req.body
    const problems = await Problem.findOne({ problemType })
    if (problems) return res.status(400).json({ error: 'Problem already exists' })
    var nProblem = new Problem({
      problemType
    })
  
    var newProblem = await Problem.create(nProblem)
    res.status(200).send({
      msg: 'Problem was created successfully',
      data: nProblem
    })
    res.json({ msg: 'Problem was created successfully', data: nProblem })
  })
  
  router.delete("/dProblem", async (req, res) => {
    const {
      problemType
    } = req.body
      const problem = await Problem.findOne(problemType);
      if (problem) {
        const deletedProblem = await Problem.findOneAndRemove(problemType);
        res.json({
          msg: "Problem was deleted successfully",
          data: deletedProblem
        });
      } else {
        return res.json({ msg: 'Problem does not exists' })
      }
  });

module.exports = router
