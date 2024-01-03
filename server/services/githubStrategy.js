import passport from "passport";
import { Strategy } from 'passport-github2';
import User from "../models/userSchema.js";


// GITHUB STRATEGY
passport.use(new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ githubId: profile.id });
    if (!user) {
        const newUser = await User.create({
            name: profile.displayName,
            provider: profile.provider,
            githubId: profile.id,
            image: profile.photos[0].value,
        });
        return cb(null, newUser);
    }
    return cb(null, user);
}
))

