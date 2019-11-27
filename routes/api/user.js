const express = require('express')
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const User = require("../../models/User");

  router.post('/register', async (req, res) => {
    const {
      email,
      password,
      problemType
    } = req.body
    const users = await User.findOne({ email })
    if (users) return res.status(400).json({ error: 'Email already exists' })
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    var nUser = new User({
      email,
      password: hashedPassword,
      problemType
    })
  
    var newUser = await Reviewer.create(nUser)
    token = jwt.sign({ id: newUser._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({
      auth: true,
      token: token,
      msg: 'User was created successfully',
      data: nUser
    })
    res.json({ msg: 'User was created successfully', data: nUser })
  })

  router.post("/login", function(req, res) {
    Reviewer.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        return res.status(401).send({ auth: false, message: "Server error." });
      }
      if (!user) {
        return res.status(401).send({ auth: false, message: "No user found." });
      }
      // const admin = Admin.findOne({ email: req.body.email});
      const loginPassword = req.body.password;
      const userPassword = user.password;
      const match = bcrypt.compareSync(loginPassword, userPassword);
      // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!match) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, id: user._id  });
    });
  });

  router.get("/logout", function(req, res) {
    res.status(200).send({ auth: false, token: null });
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
      const userProblem = await user.problemType;
  
      var query = { 
        problemType: userProblem,
        paired: "0"
      }
  
      const common = await User.find(query);
      const view = common.email
      res.json({data:view})
  
    } catch(error) {
      console.log(error);
    }
  
  })
  

  router.put("/changeProblem", async (req, res) => {
    try {
      var stat = 0;
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
        stat = decoded.id;
      });
      const {
        problemType
      } = req.body
      let id = stat;
    
      var query = { id: id};
        await User.findOneAndUpdate(query, { problemType: problemType });
        res.json({ msg: "Problem Changed Successfully" });
      
    } catch (error) {
      console.log(error);
    }
  });


  router.put("/changePair", async (req, res) => {
    try {
      var stat = 0;
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
        stat = decoded.id;
      });
      const {
        paired
      } = req.body
      let id = stat;
      const sysPaired = '0';
    if(paired==='yes'){
        sysPaired = '1';
    }
    if(paired==='Yes'){
        sysPaired = '1';
    }
      var query = { id: id};
        await User.findOneAndUpdate(query, { paired: sysPaired });
        res.json({ msg: "Availability Changed Successfully" });
      
    } catch (error) {
      console.log(error);
    }
  });


  router.delete("/disable", async (req, res) => {
    try {
      var stat = 0;
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
        stat = decoded.id;
      });
      const user = await User.findById(stat);
      if (user) {
        const deletedUser = await User.findByIdAndRemove(stat);
        res.json({
          msg: "User was deleted successfully",
          data: deletedUser
        });
      } else {
        return res.json({ msg: 'User does not exists' })
      }
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;
