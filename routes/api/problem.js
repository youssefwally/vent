// Dependencies
const express = require('express')
const router = express.Router()
const Problem = require('../../models/Problem')

router.get("/vProblems", async (req, res) => {
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
    });
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
  
module.exports = router
