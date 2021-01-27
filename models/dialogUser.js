const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dialogUserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: "dialogs",
    required: true
  }
});

dialogUserSchema.pre("find", function(next) {
  this.populate("dialog").populate("user");
  next();
});

module.exports = mongoose.model("dialogUsers", dialogUserSchema);
