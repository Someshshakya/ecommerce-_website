const express = require('express');
const router = express.Router();
const address = require('../../controller//address');
const Verify = require('../../Auth/jwt');


// POST request to register user's address
router.post('/',Verify,address.create_address);


// GET request to show list of Addresses
router.get('/myaddress',Verify,address.display_adderss);


module.exports = router;