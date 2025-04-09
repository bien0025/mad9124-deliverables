const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");



//commence le gog auth
router.get("/google", passport.authenticate("google", {scope: ["profile","email"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {session: false, failureRedirect: '/'}),
    (req, res) => {
        const token = jwt.sign(
            {id: req.user._id, name: req.user.name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
        // res.json({token});//i chnaege the logic from previous push check git logs april 5.
        
        res.redirect(`http://localhost:1505/oauth-success?token=${token}`);
    }
);

module.exports = router;
// passport.authenticate("google") redirects the user to the Google login page
// passport.authenticate("google", {session: false}) tells passport to not store the user in the session
// passport.authenticate("google", { session: false })
// Processes the Google OAuth login.
// Extracts user info and the JWT token from passport.js.
// { session: false } → Disables session-based authentication (we use JWT instead).
// req.user contains { user, token } from passport.js.
// Redirects the user to the frontend with the JWT token:
//jwt gene n sen to frend