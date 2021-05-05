const express = require('express');
const router = express.Router();
const users = require('../../controller/users')
const Verify = require('../../Auth/jwt')

// GET request to Display the home page
router.get('/',users.homePage);


// POST request to register new user
router.post("/register",users.registration);

// POST request to verify the user
router.post('/verify',Verify,users.Usrs_verification);


// POST request to verify the user
router.post("/login",users.user_login);

// GET request to logout the user
router.get('/logout',users.logout_user);


module.exports = router;