import jwt from "jsonwebtoken";

const checkLogin = async (req, res, next) => {
    try {

        const token = req.cookies['token'] || req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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