const mongoose = require("mongoose");
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

module.exports = mongoose.model("chatUsers", chatUserSchema);
