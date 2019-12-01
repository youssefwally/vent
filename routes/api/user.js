const express = require('express')
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const User = require("../../models/User");

  router.post('/register', async (req, res) => {
    try{
      const {
        email,
        password,
        problemType
      } = req.body
      const users = await User.findOne({email: req.body.email} )
      if (users) return res.status(400).json({ error: 'Email already exists' })
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)
      var nUser = new User({
        email,
        password: hashedPassword,
        problemType
      })
    
      var newUser = await User.create(nUser)
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
    }
    catch (error) {
      // We will be handling the error later
      console.log(error);
    }
  })

  router.post("/login", function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
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
      res.status(200).send({ auth: true, token: token, id: user._id ,problem: user.problemType, paired: user.paired });
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
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      const userProblem = await user.problemType;
  
      var query = { 
        _id: {$ne: id},
        problemType: userProblem,
        paired: "0"
      }
  
      const common = await User.find(query);
      const view = common
      res.json({data:view})
  
    } catch(error) {
      console.log(error);
    }
  
  })
  

  router.get('/userProblem', async (req, res) => {
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
  
     
  
     
      res.json({data:userProblem})
  
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
      let id = stat;
      const problemType = req.body.problemType;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      var query = { _id: id};
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
      let id = stat;
      var sysPaired = '0';
    if(req.body.paired==='yes'){
        sysPaired = '1';
    }
    if(req.body.paired==='Yes'){
        sysPaired = '1';
    }
    const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      var query = { _id: id};
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

  router.put("/changePassword", async (req, res) => {
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
      let id = stat;
      const password = req.body.password;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      var query = { _id: id};
        await User.findOneAndUpdate(query, { password: password });
        res.json({ msg: "Password Changed Successfully" });
      
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/changeEmail", async (req, res) => {
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
      let id = stat;
      const email = req.body.email;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "user does not exist" });
      }
      var query = { _id: id};
        await User.findOneAndUpdate(query, { email: email });
        res.json({ msg: "Email Changed Successfully" });
      
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
