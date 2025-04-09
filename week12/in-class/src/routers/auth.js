"use strict";  

const { Router } = require("express");
const passport = require("passport");
const authRouter = Router();
const authController = require("../controllers/auth");

// make sure to import the configuration we set up above
require("../util/passport");

// this route will redirect the user to google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// this route will be hit by google once they are finished.
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail", session: false }),
  authController.callback
);

module.exports = authRouter;