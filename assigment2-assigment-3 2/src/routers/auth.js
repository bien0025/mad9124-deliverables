const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user._id, name: req.user.name }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);


module.exports = router;
