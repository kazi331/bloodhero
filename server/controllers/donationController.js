import Donation from "../models/donationSchema.js";
import User from "../models/userSchema.js";

// create new donation
const createDonation = async (req, res) => {
    try {
        const newDonation = await Donation.create({ ...req.body, donor: req.userId });
        // update user donations
        await User.updateOne(
            { _id: req.userId },
            {
                lastDonation: Date.now(),
                $push: {
                    donations: newDonation._id
                }
            }
        )
        res.status(201).json({
            success: true, message: 'New donation added',
            data: newDonation
        });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: "Error in creating donation"
        });
    }
};

// GET ALL DONATIONS
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json({ success: true, data: donations });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


// GET SINGLE DONATION
const getDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findById(id).populate('donor', "-password -role -email");
        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }
        res.status(200).json({ success: true, data: donation });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// UPDATE DONATION
const updateDonation = async (req, res) => {
    const updatedDonation = await Donation.findAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    if (updateDonation) {
        res.status(200).json({ success: true, data: updatedDonation });
    } else {
        res.status(500).json({ success: false, message: err.message });
    }
}

export {
    createDonation, getDonation, getDonations, updateDonation
};
