const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ChatUser = require("../models/chatUser");
const Message = require("../models/message");
const Chat = require("../models/chat");
const User = require("../models/user");
require("dotenv").config();

router.post(
  "/message",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user || !req.body.chat) return res.send(401).send("unauthorized");

    let userMes = await User.findOne({
      username: req.user.username
    });

    let chat = await Chat.findOne({
      name: req.body.chat.name
    });

    if (!userMes) return res.send(401).send("error");
    let chatUser;
    if (!chat) {
      let users = await User.find({
        username: req.body.users.map(el => el.username)
      });
      chat = new Chat({
        name: req.body.chat.name
      });
      try {
        chat = await chat.save();
      } catch (e) {
        res.send(401).send("no permission");
      }

      Promise.all(
        users.map(async user => {
          chatUser = await ChatUser.findOne({
            user: user["_id"],
            chat: chat["_id"]
          });
          if (!chatUser) {
            chatUser = new ChatUser({
              user: user["_id"],
              chat: chat["_id"]
            });
            try {
              chatUser = await chatUser.save();
            } catch (e) {
              res.send(401).send("no permission");
            }
          }
          return user;
        })
      );
    }
    chatUser = await ChatUser.findOne({
      user: userMes["_id"],
      chat: chat["_id"]
    });
    if (!chatUser) {
      chatUser = new ChatUser({
        user: userMes["_id"],
        chat: chat["_id"]
      });
      try {
        chatUser = await chatUser.save();
      } catch (e) {
        res.send(401).send("no permission");
      }
    }
    let newMessage = new Message({
      chatUser: chatUser["_id"],
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
