const express = require('express');
const router = express.Router();
const { signupUser, loginUser, getProfile, getAllProfile, logoutUser } = require('../controller/authController');
const User = require('../models/user');
const { isAuthenticated } = require('../helper/auth')

// register route
router.post('/signUp', signupUser);
router.post('/login', loginUser);
router.get('/profile/:userId', isAuthenticated, getProfile);
router.post('/logout', logoutUser)

//test endpoint for admin auth
router.get('/allusers', getAllProfile);

module.exports = router
