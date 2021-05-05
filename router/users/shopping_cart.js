const express = require('express');
const router = express.Router();
const shopping_cart = require('../../controller/shopping_cart');
const Verify = require('../../Auth/jwt')



// POST request to add the product in shopping  cart
router.post('/',Verify,shopping_cart.add_product);


// GET request to display the cart items
router.get('/',Verify,shopping_cart.myorder);

module.exports = router;



