
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookieConfig } from '../config/utils.js';
import User from '../models/userSchema.js';
import { clientURI } from '../config/urls.js';

// REGISTER USER
const register = async (req, res) => {
    try {
        // check if user already exists
        const exist = await User.find({ email: req.body.email });
        if (exist.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }
        // REGISTER NEW USER
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hash });

        // return user
        res.status(201).json({
            success: true,
            message: 'User registration successful',
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: 'Registration failed',
            error: err.message
        });
    }
}

// UPDATE USER
const updateDonor = async (req, res) => {
    try {
        // check if user already exists
        const exist = await User.findById(req.user._id);

        if (!exist) return res.status(404).json({
            success: false,
            message: 'User does not exists',
        });
        const { name, phone, dob, area, isAvailable, type, gender } = req.body;

        // update the user with the given data in the body;


        // const user = await User.findOneAndUpdate({ _id: req.params.donorId }, { name, area, isAvailable, type, gender, dob, phone }, { new: true, }, "-password")
        const user = await User.findByIdAndUpdate(req.user._id, { name, area, isAvailable, type, gender, dob, phone },)
        // console.log(user);

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

// LOGIN USER 
const login = async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
            });
        }

        // check password
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
            });
        }

        // create token
        const token = await user.generateJWT();
        // set header
        // res.header('Access-Control-Allow-Credentials', true);
        // res.setHeader('Content-Type', 'text/html'); // nextjs 


        res.header('Access-Control-Allow-Origin', clientURI);
        res.header('Access-Control-Allow-Credentials', true);


        // save token in cookie
        res.cookie('token', 'Bearer ' + token, cookieConfig);
        // save user in cookie
        res.cookie('_id', user._id, cookieConfig);
        // return user
        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            user: { _id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Authentication failed',
        });
    }
}

// LOGOUT USER

const logout = (req, res) => {

    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.cookie('_id', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Logout failed',
        });
    }
}

// CHECK IF LOGGED IN USER'S TOKEN  IS VALID
const checkToken = (req, res) => {
    try {

        const token = req.headers?.authorization;
        if (!token) return res.status(401).json({
            success: false,
            message: 'No Token Provided',
        });
        try {

            const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
            if (decoded) {
                res.json({
                    success: true,
                    message: 'Token is valid',
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token',
                })
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Token validation failed',
            })
        }
    } catch (err) {

    }
    // GET TOKEN FROM HEADER OR COOKIE


}

export { checkToken, login, logout, register, updateDonor };

