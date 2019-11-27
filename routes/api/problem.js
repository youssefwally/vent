// Dependencies
const express = require('express')
const router = express.Router()
const Problem = require('../../models/Problem')

router.get("/vProblem", async (req, res) => {
    const problems = await Problem.find();
    const view = problems;
    res.json({ data: view });
  });


  router.post('/aProblem', async (req, res) => {
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
    try{
      const {
        problemType
      } = req.body
        const problem = await Problem.findOne({problemType: req.body.problemType});
        if (problem) {
          const deletedProblem = await Problem.findOneAndRemove({problemType: req.body.problemType});
          res.json({
            msg: "Problem was deleted successfully",
            data: deletedProblem
          });
        } else {
          return res.json({ msg: 'Problem does not exists' })
        }
    }catch (error) {
      // We will be handling the error later
      console.log(error);
    }
  });

module.exports = router
