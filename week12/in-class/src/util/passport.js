const passport = require('passport')
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');
const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI} = process.env

const User = require('../models/User')

passport.use(
    new GoogleStrategy(
        {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_REDIRECT_URI
        },
        async (_accessToken,_refreshToken, profile, cb)=>{
            try{
                console.log("!", profile);
                // here, we will look up a user by the googleId, and either
                // create a new User if none exists, or
                // update the existing User, in case they changed their name in google.
                const user = await UserActivation.findOneAndUpdate(
                    {googleId: profile.id},
                    {
                        $set: {
                            name: profile.displayName,
                            googleId: profile.id,
                        },
                    },
                    // upsert is how we tell mongoose to UP-date the document or in-SERT a new one
                    // don't forget to tell mongoose to return the updated document!
                    {upsert: true, new: true}
                );
                return cb(null, user);
                }catch(error){
                return cb(error);
            }
        }
    )
);