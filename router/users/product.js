const express = require('express');
const router = express.Router();
const products = require('../../controller/product');
const Verify = require('../../Auth/jwt')


// GET request to display List of Products
router.get('/products',Verify,products.pordut_details);

// GET request to display the Products
router.get('/products/:id',products.get_by_id);
module.exports = router;