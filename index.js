require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app  = express();
// to parse jason data
app.use(express.json());

// to parse cookies
app.use(cookieParser());

// db set_up
// require('./models/db_config')
// creating users table
// require('./models/users_table')
    // to create product table 
// require('./models/product_table')
// to create shopping cart table
// require('./models/shoping_cart')

// to create category table
require('./models/category');

// to create orders table
// require('./models/orders');

// to crearte users_address table 
// require('./models/users_address');

// require('./models/shopkeeper_db/shop_conifg')

// to create shopkeepers table to register
// require('./models/users_table');

// to create shopkeeper_product table
// require('./models/shopkeer/shopkeeper_product');

// to  create and update shop_keeper details
require('./models/shopkeeper_db/shop_conifg')



// working of Routers
const users = require('./router/users/users');
const productRouter = require('./router/users/product');
const categoryRouter = require('./router/users/category');
const shopping_cart = require('./router/users/shopping_cart');
const orders_Router = require('./router/users/order');
const addressRouter = require('./router/users/address');
const shopkeeperRouter  = require('./router/shopkeeper/shopkeeper');



app.use("/users",users);
app.use("/products",productRouter);
app.use('/',categoryRouter);
app.use('/shopping_cart',shopping_cart);
app.use('/orders',orders_Router);
app.use('/address',addressRouter);
app.use('/shopkeeper',shopkeeperRouter);




// home page
app.get('/',(req,res)=>{
    res.send({Msg: "You are welcome on home page!"})
})
// creating server on the localhost
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server is running ...${PORT}`)
})