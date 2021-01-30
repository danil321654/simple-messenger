const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

router.get(
  "/users",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    let users = await User.find();
    let usernames = users.map(user => user.username);
    return res.send(usernames);
  }
);

module.exports = router;
