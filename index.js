const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const passportConfig = require("./config/passport-config");
const db = require("./config/db");
const routes = require("./routes/index");

passportConfig(passport);
passport.initialize();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(process.env.port || 3000);

io.on("connection", socket => {
  socket.on("join", (chat, callback) => {
    socket.join(chat.name);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    io.to(message.chat.name).emit("message");
    callback();
  });

  socket.on("disconnect", () => {});
});
