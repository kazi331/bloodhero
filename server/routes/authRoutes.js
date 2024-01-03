import express from 'express';
import passport from 'passport';
import { clientURI } from '../config/urls.js';
import { checkToken, login, logout, register, updateDonor } from '../controllers/authController.js';
import checkLogin from '../middlewares/checkLogin.js';
const router = express.Router();



// AUTH RELATED ROUTES
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/checktoken', checkToken)
router.patch('/update/:donorId', checkLogin, updateDonor)

// SOCIAL FAILED ROUTES
router.get("/failed/:provider", (req, res) => {
    console.log('failed provider:', req.params.provider)
    res.status(401).json({
        success: false,
        message: "Authentication failed.",
    });
});


// GOOGLE AUTH ROUTES
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// GOOGLE CALLBACK
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/failed/google', }),
    (req, res) => {
        const token = req.user.generateJWT();
        res.cookie('token', "Bearer " + token, { httpOnly: true, secure: true });
        res.redirect(clientURI + '/profile')
    }
)

// FACEBOOK AUTH ROUTES
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/failed/facebook' }),
    function (req, res) {
        const token = req.user.generateJWT();
        res.cookie('token', "Bearer " + token, { httpOnly: true, secure: true });
        res.redirect(clientURI + '/profile');
    });


// GITHUB AUTH ROUTES
router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/failed/github' }),
    function (req, res) {
        const token = req.user.generateJWT();
        res.cookie('token', "Bearer " + token, { httpOnly: true, secure: true });
        res.redirect(clientURI + '/profile')
    });

export default router;