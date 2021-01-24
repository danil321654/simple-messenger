const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dialogMessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: 'dialogs',
    required: true
  }
})

module.exports = mongoose.model('dialogMessages', dialogMessageSchema)
