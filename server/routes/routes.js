import express from 'express';
import { createDonation, getDonation, getDonations } from '../controllers/donationController.js';
import { getDonor, getDonors } from '../controllers/donorController.js';
import { deleteUser, getLoggedUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkLogin from '../middlewares/checkLogin.js';

const router = express.Router();

// USER RELATED ROUTES
router.get('/users', getUsers);
router.get('/logged-user', getLoggedUser); // used
router.get('/users/:userId', getUser); // unused
router.delete('/users/:userId', checkLogin, checkAdmin, deleteUser)
router.patch('/users/:userId', checkLogin, checkAdmin, updateUser)


// DONOR RELATED ROUTES
router.get('/donors', getDonors);
router.get('/donors/:donorId', getDonor);

// DONATION RELATED ROUTES 
router.post('/donations', checkLogin, createDonation)
router.get('/donations', getDonations)
router.get('/donations/:id', getDonation)

export default router;
