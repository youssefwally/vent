// Dependencies
const express = require('express')
const router = express.Router()
const Problem = require('../../models/Problem')
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const User = require("../../models/User");
router.get("/vProblem", async (req, res) => {
    const problems = await Problem.find();
    const view = problems;
    res.json({ data: view });
  });

  router.get('/sProblemView', async (req, res) => {
    try {
      var stat = 0
      var token = req.headers['x-access-token'];
     
      if (!token) {
        return res
          .status(401)
          .send({ auth: false, message: 'Please login first.'});
      }
      jwt.verify(token, config.secret, async function(err, decoded) {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: 'Failed to authenticate token.'});
        }
  
        stat=decoded.id;
      })
  
      let id = stat;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      const userProblem = await user.problemType;
      var query = { 
        _id: {$ne: id},
        problemType: userProblem,
        paired: "No"
      }
  
      const common = await User.find(query);
      const view = common;
      res.json({data:view});
  
    } catch(error) {
      console.log(error);
    }
  
  })
  


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
