import { Schema, Types, model } from 'mongoose';
import { bloodTypes } from '../config/utils.js';
const donationSchema = new Schema({
    patient: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: bloodTypes,
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    },
    phone: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    donor: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Donation = model('Donation', donationSchema);
export default Donation;