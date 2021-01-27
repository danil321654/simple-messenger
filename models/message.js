const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  dialogUser: {
    type: Schema.Types.ObjectId,
    ref: "dialogUsers",
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
  this.populate("dialogUser");
  next();
});

module.exports = mongoose.model("messages", messageSchema);
