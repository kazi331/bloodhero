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

// GOOGLE FAILED ROUTES
router.get("/google/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Authentication failed.",
        user: null,
    });
});
// FACEBOOK FAILED ROUTES
router.get("/facebook/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Authentication failed.",
        user: null,
    });
});

// GOOGLE AUTH
router.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))
// GOOGLE CALLBACK
router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        failureRedirect: '/google/failed',
    }),
    (req, res) => {
        const token = req.user.generateJWT();
        res.cookie('token', "Bearer " + token);
        res.redirect(clientURI)
    }
)

// FACEBOOK AUTH ROUTES
router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['id', 'displayName', 'photos', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/api/auth/facebook/failed' }),
    function (req, res) {

        const token = req.user.generateJWT();
        res.cookie('token', "Bearer " + token);
        res.send(req.user)
        // res.redirect(clientURI);
    });

export default router;