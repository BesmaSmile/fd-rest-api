const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
}, { timestamp: true });

module.exports = mongoose.model('User', userSchema);
