

import User from "../models/userSchema.js";

// GET ALL DONORS
const getDonors = async (req, res) => {
    try {
        const query = req.query;
        // exclude donors who don't have type field
        const donors = await User
            .where('type')
            .exists()
            .find({ ...query })
            .select("_id name area type phone isAvailable image");
        res.json(donors);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: "Data load error",
        })
    }
}

// GET SINGLE DONOR
const getDonor = async (req, res) => {
    try {
        const user = await User.findById(req.params.donorId, "-dob -password -email -role -__v")
            .populate("donations", "-donor -isApproved -__v", { isApproved: true });
        res.json(user);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
}


export {
    getDonor, getDonors
};

