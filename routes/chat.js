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
      return res.send([]);
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
    return res.send(newChats.length ? newChats : []);
  }
);

router.get(
  "/chat",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    console.log(req.query);
    if (!req.user) return res.send(401);

    let user = await User.findOne({
      username: req.user.username
    });

    if (!user) return res.send(401);
    let chatUser, chat;

    try {
      chat = await Chat.findOne({
        name: JSON.parse(req.query.chat).name
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

router.post(
  "/chat",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.send(401).send("unauthorized");

    console.log(req.body);

    let userMes = await User.findOne({
      username: req.user.username
    });

    let chat = await Chat.findOne({
      name: req.body.name
    });

    if (!userMes) return res.send(401).send("error");
    let chatUser;
    if (!chat) {
      let users = await User.find({
        username: req.body.users
      });
      chat = new Chat({
        name: req.body.name
      });
      try {
        chat = await chat.save();
      } catch (e) {
        res.send(401).send("no permission");
      }

      console.log("here4");
      Promise.all(
        users.map(async user => {
          chatUser = await ChatUser.findOne({
            user: user["_id"],
            chat: chat["_id"]
          });
          console.log("here5");
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

    console.log("here6");
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
    res.send("chat added");
  }
);

router.post(
  "/deleteChat",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.send(401).send("unauthorized");

    console.log(req.body);

    let userMes = await User.findOne({
      username: req.user.username
    });

    let chat;

    try {
      chat = await Chat.deleteOne({
        name: req.body.name
      });
    } catch (e) {
      return res.send(401).send("no chat");
    }
    return res.send("chat removed");
  }
);

module.exports = router;
