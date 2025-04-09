const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');


const validateMatch = [
  body('court')
    .custom((value) => mongoose.Types.ObjectId.isValid(value)) 
    .withMessage('Invalid Court ID format'),

  body('player1')
    .isString().withMessage('Player 1 must be a string')
    .isLength({ min: 3, max: 64 }).withMessage('Player 1 must be 3-64 characters long'),

  body('player2')
    .isString().withMessage('Player 2 must be a string')
    .isLength({ min: 3, max: 64 }).withMessage('Player 2 must be 3-64 characters long'),

    body('winner')
    .isString().withMessage('Winner must be a string')
    .isLength({ min: 3, max: 64 }).withMessage('Winner must be 3-64 characters long')
    .custom((winner, { req }) => {
      if (winner !== req.body.player1 && winner !== req.body.player2) {
        throw new Error('Winner must be either player1 or player2');
      }
      return true;
    })
    .withMessage('Winner must be either player1 or player2'),
  

    body('sets')
    .isArray({ min: 3, max: 5 }).withMessage('Sets must contain 3-5 rounds')
    .custom((sets) => {
      if (!sets.every(round => Array.isArray(round) && round.length === 2)) {
        throw new Error('Each set must contain exactly 2 points');
      }
      if (!sets.every(([p1, p2]) => typeof p1 === 'number' && typeof p2 === 'number')) {
        throw new Error('Each point in the set must be a number');
      }
      return true;
    })
    .withMessage('Invalid sets format'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateMatch;
