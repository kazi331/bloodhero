import jwt from "jsonwebtoken";

const checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
            });
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        // assign userId and email to req object
        req.user = decoded
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
        // next('Authentication failed')
    }
}

export default checkLogin;