const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 64 },
  googleId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
