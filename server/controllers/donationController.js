import Donation from "../models/donationSchema.js";
import User from "../models/userSchema.js";

// create new donation
const createDonation = async (req, res) => {
    try {
        const { patient, phone, hospital, type, date } = req.body;
        const newDonation = await Donation.create({
            patient,
            phone,
            hospital,
            type,
            date,
            isApproved: req.user.role === 'admin' ? true : false, // if admin, then approved
            donor: req.user.role === 'admin' ? req.body.donor_id : req.user._id // if admin, then donor_id, else user_id
        });
        // update user donations
        if (req.user.role === 'admin') {
            await User.updateOne(
                { _id: req.body.donor_id },
                {
                    lastDonation: date,
                    $push: {
                        donations: newDonation._id
                    }
                }
            )
        }
        await User.updateOne(
            { _id: req.user._id },
            {
                lastDonation: date,
                $push: {
                    donations: newDonation._id
                }
            }
        )
        res.status(201).json({
            success: true,
            message: 'New donation added',
            data: newDonation
        });

    } catch (err) {
        let errMsg;

        if (err.message.includes('type')) {
            errMsg = `Invalid blood type`;
        } else if (err.message.includes('hospital')) {
            errMsg = `Invalid hospital`;
        } else if (err.message.includes('patient')) {
            errMsg = `Invalid patient name`;
        } else if (err.message.includes('phone')) {
            errMsg = `Invalid phone number`;
        } else if (err.message.includes('date')) {
            errMsg = `Invalid date`;
        } else {
            errMsg = `Invalid data`;
        }

        console.log(err.message)
        res.status(500).json({
            success: false,
            message: "Donation not added!",
            error: errMsg
        });
    }
};

// GET ALL DONATIONS
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
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

// UPDATE DONATION STATUS
const toggleDonationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const newStatus = req.query.status;
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }
        const updatedDonation = await Donation.findByIdAndUpdate(id, { isApproved: newStatus });
        res.status(200).json({ success: true, data: updatedDonation });
    } catch (err) {
        res.status(500).json({ success: false, message: "Donation Update Failed", error: err.message });
    }
}

// Delte Single DONATION STATUS
const deleteSingleDonation = async (req, res) => {
    try {
        const { id } = req.params;
        await Donation.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Donation deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete donation!", error: err.message });
    }
}
// Delte Single DONATION STATUS
const deleteMultipleDonation = async (req, res) => {
    try {
        await Donation.deleteMany({ _id: req.body.ids });
        res.status(200).json({ success: true, message: 'Donations deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete donations!", error: err.message });
    }
}
export {
    createDonation, deleteMultipleDonation, deleteSingleDonation, getDonation, getDonations, toggleDonationStatus, updateDonation
};

