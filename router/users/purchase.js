const express = require('express');
const router = express.Router();
const purchase_product = require('../../controller/purchase');
const Verify = require('../../Auth/jwt')


// GET request to puchase the product;
router.get('/purchase',Verify,purchase_product.purchase_product);

module.exports = router;x