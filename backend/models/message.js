const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  chatUser: {
    type: Schema.Types.ObjectId,
    ref: "chatUsers",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

messageSchema.pre("find", function(next) {
  this.populate("chatUser");
  next();
});

module.exports = mongoose.model("messages", messageSchema);
