const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const DialogUser = require("../models/dialogUser");
const Message = require("../models/message");
const Dialog = require("../models/dialog");
const User = require("../models/user");
require("dotenv").config();

router.post(
  "/message",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.body.user || !req.body.dialog)
      return res.send(401).send("unauthorized");

    let userMes = await User.findOne({
      username: req.body.user.username
    });

    let users = await User.find({
      username: req.body.users.map(el => el.username)
    });

    let dialog = await Dialog.findOne({
      name: req.body.dialog.name
    });

    if (!userMes) return res.send(401).send("error");

    if (!dialog) {
      dialog = new Dialog({
        name: req.body.dialog.name
      });
      try {
        dialog = await dialog.save();
      } catch (e) {
        res.send(401).send("no permission");
      }
    }
    Promise.all(
      users.map(async user => {
        let dialogUser = await DialogUser.findOne({
          user: user["_id"],
          dialog: dialog["_id"]
        });
        if (!dialogUser) {
          dialogUser = new DialogUser({
            user: user["_id"],
            dialog: dialog["_id"]
          });
          try {
            dialogUser = await dialogUser.save();
          } catch (e) {
            res.send(401).send("no permission");
          }
        }
        return user;
      })
    );
    let dialogUser = await DialogUser.findOne({
      user: userMes["_id"],
      dialog: dialog["_id"]
    });
    let newMessage = new Message({
      dialogUser: dialogUser["_id"],
      text: req.body.message.text
    });
    try {
      newMessage = await newMessage.save();
      res.send("message complete");
    } catch (e) {
      res.send(401).send("no permission");
    }
  }
);

module.exports = router;
