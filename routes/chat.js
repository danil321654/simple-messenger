const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const ChatUser = require("../models/chatUser");
const Message = require("../models/message");
const Chat = require("../models/chat");
const User = require("../models/user");
require("dotenv").config();

router.get(
  "/chats",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.send(401);
    console.log(req.user);
    let user = await User.findOne({
      username: req.user.username
    });
    let chatUser;
    if (!user) return res.send(401);
    try {
      chatUser = await ChatUser.find({
        user: user["_id"]
      });
    } catch (e) {
      console.log(e);
      return res.send(e);
    }

    let chats = [];
    if (!chatUser.length || chatUser.length < 1) {
      return res.send("empty");
    }

    chats = [...new Set(chatUser.map(chat => chat.chat))];

    chatUser = await ChatUser.find({
      chat: chats
    });

    let messages = await Message.find({
      chatUser: chatUser
    });

    let newChats = chats.map(chat => {
      let lastMessage = messages
        .filter(mess => mess.chatUser.chat.name == chat.name)
        .sort((a, b) => Date(a.createdDate) - Date(b.createdDate))
        .reverse()[0];
      return {
        _id: chat["_id"],
        name: chat.name,
        users: chatUser
          .filter(du => du.chat.name == chat.name)
          .map(el => {
            return {name: el.user.name, username: el.user.username};
          }),
        createdDate: chat.createdDate,
        lastMessage: lastMessage
      };
    });
    return res.send(newChats);
  }
);

router.post(
  "/chat",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    console.log(req.body);
    if (!req.user) return res.send(401);

    let user = await User.findOne({
      username: req.user.username
    });

    if (!user) return res.send(401);
    let chatUser, chat;

    try {
      chat = await Chat.findOne({
        name: req.body.chat.name
      });
      chatUser = await ChatUser.find({
        user: user["_id"],
        chat: chat["_id"]
      });
    } catch (e) {
      console.log(e);
      return res.send(e);
    }
    let chats = [];
    if (!chatUser.length || chatUser.length < 1) {
      return res.send("empty");
    }

    chats = [...new Set(chatUser.map(chat => chat.chat))];

    chatUser = await ChatUser.find({
      chat: chat["_id"]
    });

    let messages = await Message.find({
      chatUser: chatUser
    });

    let newChats = chats.map(chat => {
      messages = messages
        .filter(mess => mess.chatUser.chat.name == chat.name)
        .sort((a, b) => Date(a.createdDate) - Date(b.createdDate));
      return {
        _id: chat["_id"],
        name: chat.name,
        users: chatUser
          .filter(du => du.chat.name == chat.name)
          .map(el => {
            return {name: el.user.name, username: el.user.username};
          }),
        createdDate: chat.createdDate,
        messages: messages
      };
    });
    return res.send(newChats[0]);
  }
);

module.exports = router;
