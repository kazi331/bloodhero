import User from "../models/userSchema.js";

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === 'moderator') {
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
            message: 'Moderator authorization failed',
        });
        next('Moderator authorization failed')
    }
}


export default checkAdmin;