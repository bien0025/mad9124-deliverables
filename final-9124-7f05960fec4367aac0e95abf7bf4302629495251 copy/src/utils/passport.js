const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:1505/auth/google/callback'
        },
            async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({googleId: profile.id});
                if(!user){
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                    await user.save();
                }
                const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '7d'});

                return done(null, {user, token});
                }catch (erreur) {
                    console.error('Error in Google strategy:', erreur);
                    return done(erreur, null);
                }
            }
        )
    );

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        const user = await User.findById(id);
        done(null, user);
    });


    //passport.use(new googleStr enregistre la strategie google authantication dans passport. il communique avec google pour authentifier l'utilisateur
    // the ascyn func runs when google send sums back to us. Profile contient les infos de l'utilisateur
    //let user = await User.findOne if they exist log them in else create a new user
    // if (!user) { if no user is found fait un avec google id and le nom affiche sur le profile gogl