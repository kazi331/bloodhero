import passport from "passport";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy } from 'passport-google-oauth20';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
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

// JWT STRATEGY    
passport.use(new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (payload, done) => {
    const user = await User.findById(payload.id);
    if (user) return done(null, user);
    return done(null, false);
}))

// FACEBOOK STRATEGY
passport.use(new FacebookStrategy({
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
