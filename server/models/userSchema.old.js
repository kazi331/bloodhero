import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        // min: 6, max: 15
    },
    email: {
        type: String,
        required: true
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
    password: {
        type: String,
        required: true,
        max: 20, min: 6
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
    joined: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    area: {
        type: String,
    },
    type: {
        type: String,
        enum: ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-'],
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: null,
    },
    role: String,
    lastDonation: {
        type: Date,
        default: null,
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ]
})

const User = model('User', userSchema);
// export default User;