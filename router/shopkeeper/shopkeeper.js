const express = require('express');
const router = express.Router();
const sKeeper = require('../../controller/shopkeeper');
const Verify = require('../../Auth/jwt');


// POST request to register a shopkeeper
router.post('/create_shop',Verify,sKeeper.create_shop);

// POST request to create products in table
router.post('/insert_product',Verify,sKeeper.insert_product);

// DELETE request to delete product from the table
router.delete('/delete/:id',Verify,sKeeper.delete_product);

// PUT request to update the product details
router.put('/edit_product/:id',Verify,sKeeper.update_product);

// get request to display all products
router.get('/products',sKeeper.display_allproduct);

module.exports = router;

// {
//     "shopkeeper_name" : "roshan don",
//     "shop_name": "Nicky Shoes",
//     "description": "Here you can buy Fancy Shoes with Latest Design",
//     "gst_no":"23",
//     "address_line_1":"Akshardham d-232",
//     "address_line_2":"near metro station",
//     "state":"delhi",
//     "city":"delhi",
//     "country":"India",
//     "email" : "don@gmail.com",
//     "mobile_no":"8433421817",
//     "pin_code" : "110092"
// }