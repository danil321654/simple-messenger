const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: "dialogs",
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

module.exports = mongoose.model("messages", messageSchema);
