const express = require('express');
const router = express.Router();
const category = require('../../controller/category');
const Verify = require('../../Auth/jwt');


// GET request to display List of Products with categories
router.get('/products_cat',category.dispaly_with_cat);

// GET request to display List of  categories
router.get('/categories',category.display_cat);

// GET request to display category by id
router.get('/categories/:id',category.cat_by_id);


module.exports = router;