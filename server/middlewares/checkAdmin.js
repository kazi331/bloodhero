import User from "../models/userSchema.js";

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: 'Authorization failed',
            });
            next('Authorization failed')
        }
    } catch {
        res.status(401).json({
            success: false,
            message: 'Admin authorization failed',
        });
        next('Admin authorization failed')
    }
}


export default checkAdmin;