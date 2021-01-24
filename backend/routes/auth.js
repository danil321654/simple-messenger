const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

router.get(
  "/protected",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!"
    });
  }
);

router.post("/register", (req, res) => {
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: "Please pass username and password."});
  } else {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: "Error while creating a user"});
      }
      res.json({success: true, msg: "Successful created new user."});
    });
  }
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.sign(user.toJSON(), process.env.secret);
            res.json({success: true, token: "Bearer " + token});
          } else {
            console.log(err);
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

module.exports = router;
