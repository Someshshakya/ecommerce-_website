const { response } = require('express');
const knex = require('../models/db_config');
// to modify the data in good format
const moment = require('moment');

// to add the items in the cart
exports.add_product = async (req,res)=>{
    try {
        var user_id = req.user_id.id;
        if (user_id!=undefined){
            function add_items(user_id, product_id, delievery_date, LastModifiedDate, CreatedDate, isDeleted,  shop_id){
                this.user_id = user_id;
                this.product_id = product_id;
                this.delievery_date = delievery_date;
                this.LastModifiedDate = LastModifiedDate;
                this.CreatedDate = CreatedDate;
                this.isDeleted = isDeleted;
                this.shop_id = shop_id;
            }
    
            //data from the URL
            var product_id = req.query.items_id; // product_id is same as items_id
            var shop_id =  req.query.shop_id;
            var LastModifiedDate = null;
            var isDeleted = false;
            var delievery_date = null;
    
            var CreatedDate = moment().format("YYYY MM DD");
            
            let items = new add_items(user_id, product_id, delievery_date, LastModifiedDate, CreatedDate, isDeleted, shop_id);
            
            // to store the items details in cart;
            await knex('shopping_cart').insert(items);
    
            res.send({Your_product_added_successfully:items})        
        }else{

            function add_items(product_id, delievery_date, LastModifiedDate, CreatedDate, isDeleted,  shop_id){
                this.product_id = product_id;
                this.delievery_date = delievery_date;
                this.LastModifiedDate = LastModifiedDate;
                this.CreatedDate = CreatedDate;
                this.isDeleted = isDeleted;
                this.shop_id = shop_id;
            }
    
            //data from the URL
            var product_id = req.query.items_id; // product_id is same as items_id
            var shop_id =  req.query.shop_id;
            var LastModifiedDate = null;
            var isDeleted = false;
            var delievery_date = null;
    
            var CreatedDate = moment().format("YYYY MM DD");
            
            let items = new add_items(product_id, delievery_date, LastModifiedDate, CreatedDate, isDeleted, shop_id);
            await knex('shopping_cart').insert(items);
    
            res.send({Your_product_added_successfully:items})
        }


    } catch (error) {
        console.log(error)
        res.send({err_msg:error})   
    }   
}


// to display user's orders
exports.myorder = async(req,res)=>{
    try {
        let user_id = req.user_id.id;
        const mydata = await knex('shopping_cart').select('*').where('user_id',user_id);
        if (mydata.length!=0){
            res.send({listOf_items_in_a_cart_:mydata})
        }else{
            res.send({Sorry:"You have not selected any products"})
        }
    } catch (error) {
        res.send({errMsg:error})
    }
}

// to display your total amount
exports.payment = async(req,res)=>{
    try {
        let user_id = req.user_id.id;
        var total_amount = 0;
        let amount = await knex('shopping_cart').select("price").where('user_id',user_id);
        for (let i = 0; i<amount.length;i++){
            let price = parseInt(amount[i].price)
            total_amount += price
        }
        res.send({Total_amount:total_amount})

    } catch (error) {
        res.send({errMsg:error})
    }
}