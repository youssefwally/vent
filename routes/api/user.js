const express = require('express')
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const User = require("../../models/User");

module.exports = router;
