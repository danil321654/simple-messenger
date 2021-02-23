const mongoose = require("mongoose");
const Message = require("./message");
const Schema = mongoose.Schema;

const chatUserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chats",
    required: true
  }
});

chatUserSchema.pre("find", function(next) {
  this.populate("user").populate("chat");
  next();
});

chatUserSchema.pre(/delete/, async function(next) {
  const message = await Message.deleteMany({
    "chatUser._id": this.getQuery()._id
  });
  next();
});

module.exports = mongoose.model("chatUsers", chatUserSchema);
