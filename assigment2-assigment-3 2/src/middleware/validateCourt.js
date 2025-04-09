const { body, validationResult } = require('express-validator');

const validateCourt = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3, max: 250 }).withMessage('Name must be 3-250 characters long'),

  body('count')
    .isInt({ min: 1, max: 99 }).withMessage('Count must be between 1 and 99'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateCourt;
