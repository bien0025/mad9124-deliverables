const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true
  },
  player1: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64
  },
  player2: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64
  },
  winner: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64
  },
  sets: {
    type: [[Number]],  
    validate: {
      validator: function (v) {
        return v.length >= 3 && v.length <= 5 && v.every(round =>
          Array.isArray(round) && round.length === 2 &&
          round.every(score => typeof score === 'number')
        );
      },
      message: 'Sets must contain 3-5 rounds of two scores each.'
    }
  },
  date: { type: Date, default: Date.now }

});



const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
