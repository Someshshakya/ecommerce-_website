const express = require('express');
const router = express.Router();
const shopping_cart = require('../../controller/shopping_cart');
const Verify = require('../../Auth/jwt')



// GET request to add the product and shopping  cart
router.post('/:id',Verify,shopping_cart.add_product);


// GET request to display the orders 
router.get('/',Verify,shopping_cart.myorder);


// GET request to dispaly your total amount
router.get('/payment',Verify,shopping_cart.payment);
module.exports = router;



