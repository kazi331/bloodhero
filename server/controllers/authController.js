
import User from '../models/userSchema.js';


// LOGIN USER 
const login = async (req, res) => {
    try {
        const { uid, providerId, email, displayName, phoneNumber, photoURL } = req.body;
        // check if user exists
        const user = await User.findOne({ uid }, "-password -role -__v").populate("donations", "-donor -__v");

        if (!user) {
            const user = await User.create({
                uid,
                provider: providerId,
                email,
                image: photoURL,
                name: displayName
            });
            return res.status(201).json({
                success: true,
                message: 'Authentication successful',
                user
            });
        }
        // return user
        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            user
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Authentication failed',
        });
    }
}

// UPDATE USER
const updateProfile = async (req, res) => {
    try {
        // check if user already exists
        const exist = await User.findById(req.params.userId);
        // console.log('exist:', exist);
        
        if (!exist) return res.status(404).json({
            success: false,
            message: 'User does not exists',
        });
        const { name, phone, dob, area, isAvailable, type, gender } = req.body;

        // update the user with the given data in the body;


        const user = await User.findByIdAndUpdate(req.params.userId, { name, area, isAvailable, type, gender, dob, phone },)

        res.status(201).json({
            success: true,
            message: 'Profile updated successful',
            // user: { name: user.name, email: user.email, phone: user.phone, _id: user._id }
            user

        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Update failed',
        });
    }
}




export { login, updateProfile };

