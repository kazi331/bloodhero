
import User from "../models/userSchema.js";



// get single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, "-password -role -__v").populate("donations", "-donor -__v");
        res.json(user);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
}
// get single user
const getLoggedUser = async (req, res) => {
    try {
        const user = await User.findById(req.cookies._id, "-password -role -__v").populate("donations", "-donor -__v");
        res.json(user);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
}
// get signed in user
const getSignedInUser = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid }, "-password -role -__v").populate("donations", "-donor -__v");
        res.json(user);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
}

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password -email -role -__v");
        res.json(users);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Data load error",
        })
    }
}
// delete user
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user) {
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                _id: user._id
            }
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
}
// update user
const updateUser = async (req, res) => {
    const id = req.params.userId;

    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body);
    if (updatedUser) {
        res.status(202).json({
            success: true,
            message: 'User updated successfully',
            data: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                _id: updatedUser._id
            }
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
}

export {
    deleteUser, getLoggedUser, getSignedInUser, getUser, getUsers, updateUser
};

