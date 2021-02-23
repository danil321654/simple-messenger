const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatUser = require("./chatUser");
const Message = require("./message");

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

chatSchema.pre("find", function(next) {
  this.populate("chat").populate("user");
  next();
});
chatSchema.pre(/delete/, async function(next) {
  const chatUsers = await ChatUser.deleteMany({
    "chat._id": this.getQuery()._id
  });
  next();
});

module.exports = mongoose.model("chats", chatSchema);
