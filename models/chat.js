const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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



module.exports = mongoose.model("chats", chatSchema);
