import express from 'express';
import { createDonation, deleteMultipleDonation, deleteSingleDonation, getDonation, getDonations, toggleDonationStatus } from '../controllers/donationController.js';
import { getDonor, getDonors } from '../controllers/donorController.js';
import { deleteUser, getSignedInUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkLogin from '../middlewares/checkLogin.js';
import checkLogin2 from '../middlewares/checkLogin2.js';

const router = express.Router();

// USER RELATED ROUTES
router.get('/users', getUsers);
// router.get('/logged-user', getLoggedUser); // used
router.get('/signed-in-user/:uid', getSignedInUser); // used
router.get('/users/:userId', getUser); // unused
router.delete('/users/:userId', checkLogin, checkAdmin, deleteUser) // admin
router.patch('/users/:userId', checkLogin, checkAdmin, updateUser) // admin


// DONOR RELATED ROUTES
router.get('/donors', getDonors);
router.get('/donors/:donorId', getDonor);

// DONATION RELATED ROUTES 
router.post('/donations', checkLogin2, createDonation) // for logged in users only
router.post('/donations', checkLogin, checkAdmin, createDonation) // for admin only
router.get('/donations', getDonations)
router.get('/donations/:id', getDonation);

// admin only
// change donation status
router.patch('/donations/:id', checkLogin, checkAdmin, toggleDonationStatus);
// delete single donation
router.delete('/donations/:id', checkLogin, checkAdmin, deleteSingleDonation);
// delete multiple donation
router.delete('/donations-delete-multiple', checkLogin, checkAdmin, deleteMultipleDonation);



export default router;
