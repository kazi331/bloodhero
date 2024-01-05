import { Schema, Types, model } from 'mongoose';
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
        enum: ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-']
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