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

  

module.exports = router;
