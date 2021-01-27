const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const DialogUser = require("../models/dialogUser");
const Message = require("../models/message");
const Dialog = require("../models/dialog");
const User = require("../models/user");
require("dotenv").config();

router.get(
  "/dialogs",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.send(401);
    console.log(req.user);
    let user = await User.findOne({
      username: req.user.username
    });
    let dialogUser;
    if (!user) return res.send(401);
    try {
      dialogUser = await DialogUser.find({
        user: user["_id"]
      });
    } catch (e) {
      console.log(e);
      return res.send(e);
    }

    let dialogs = [];
    if (!dialogUser.length || dialogUser.length < 1) {
      return res.send("empty");
    }

    dialogs = [...new Set(dialogUser.map(dialog => dialog.dialog))];

    dialogUser = await DialogUser.find({
      dialog: dialogs
    });

    let messages = await Message.find({
      dialogUser: dialogUser
    });

    let newDialogs = dialogs.map(dialog => {
      let lastMessage = messages
        .filter(mess => mess.dialogUser.dialog.name == dialog.name)
        .sort((a, b) => Date(a.createdDate) - Date(b.createdDate))
        .reverse()[0];
      return {
        _id: dialog["_id"],
        name: dialog.name,
        users: dialogUser
          .filter(du => du.dialog.name == dialog.name)
          .map(el => {
            return {name: el.user.name, username: el.user.username};
          }),
        createdDate: dialog.createdDate,
        lastMessage: lastMessage
      };
    });
    return res.send(newDialogs);
  }
);

module.exports = router;
