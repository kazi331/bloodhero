import passport from "passport";
import { Strategy } from 'passport-google-oauth20';
import User from "../models/userSchema.js";


// GOOGLE STRATEGY
passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
        const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: profile.provider,
            googleId: profile.id,
            image: profile.photos[0].value,
        });
        return cb(null, newUser);
    }
    return cb(null, user);
}
))