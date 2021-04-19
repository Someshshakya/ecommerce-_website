const express = require('express');
const router = express.Router();
const orders = require('../../controller/orders');
const Verify = require('../../Auth/jwt')



// GET request to add the product and shopping  cart
router.get('/',Verify,orders.create_order);

// GET request to display your orders
router.get('/myorders',Verify,orders.myorders);

// GET request to display orders by id
router.get('/myorders/:id',Verify,orders.display_orders_by)


module.exports = router;



