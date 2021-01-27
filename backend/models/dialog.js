const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dialogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});




dialogSchema.pre("find", function(next) {
  this.populate("dialog").populate("user");
  next();
});



module.exports = mongoose.model("dialogs", dialogSchema);
