const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  count: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  }
});

module.exports = mongoose.model('Court', courtSchema);
