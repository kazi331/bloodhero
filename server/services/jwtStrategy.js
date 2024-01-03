import passport from "passport";
import { Strategy } from 'passport-jwt';
import User from "../models/userSchema.js";


// JWT STRATEGY    
passport.use(new Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (payload, done) => {
    const user = await User.findById(payload.id);
    if (user) return done(null, user);
    return done(null, false);
}))
