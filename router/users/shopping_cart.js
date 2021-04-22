const express = require('express');
const router = express.Router();
const shopping_cart = require('../../controller/shopping_cart');
const Verify = require('../../Auth/jwt')



// GET request to add the product in shopping  cart
router.post('/',Verify,shopping_cart.add_product);


// GET request to display the cart items
router.get('/',Verify,shopping_cart.myorder);


// GET request to dispaly your total amount
router.get('/payment',Verify,shopping_cart.payment);
module.exports = router;



