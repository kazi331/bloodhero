import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { bloodTypes } from '../config/utils.js';

const userSchema = new Schema({
    name: String,
    email: String,
    password: { type: String, max: 20, min: 6 },
    provider: {
        type: String,
        required: true,
        default: 'email',
    },
    googleId: String,
    githubId: String,
    facebookId: String,
    gender: { type: String, enum: ['male', 'female'] },
    joined: { type: Date, default: Date.now, },
    area: String,
    isAvailable: { type: Boolean, default: false },
    image: String,
    type: {
        type: String,
        enum: bloodTypes,
    },
    role: {
        type: String,
        enum: ['dev', 'admin', 'moderator', 'volunteer'],
    },
    phone: {
        type: Number,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
        // match: /^\d{11}$/ // 11 digits
    },

    dob: {
        type: Date,
        validate: {
            validator: function (value) {
                return value < Date.now();
            },
            message: 'Date of birth should be less than today'
        }
    },
    lastDonation: { type: Date, default: null, },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ]
})

userSchema.methods.generateJWT = function () {
    // create token
    const token = jwt.sign({
        _id: this._id,
        provider: this.provider,
        email: this.email,
    }, process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

const User = model('User', userSchema);
export default User;