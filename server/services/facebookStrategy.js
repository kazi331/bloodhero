import passport from "passport";
import { Strategy } from 'passport-facebook';
import User from "../models/userSchema.js";


// FACEBOOK STRATEGY
passport.use(new Strategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile))
        try {
            const user = await User.findOne({ facebookId: profile.id });
            if (!user) {
                const newUser = await User.create({
                    name: profile.displayName,
                    // email: profile.emails[0]?.value,
                    provider: profile.provider,
                    facebookId: profile.id,
                    // image: profile.photos[0]?.value,
                });
                return cb(null, newUser);
            }
            return cb(null, user);
        } catch (err) {
            return cb(err, null);
        }
        // return;

    }
));
