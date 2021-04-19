const knex = require('../models/db_config');

exports.create_order = async (req,res) =>{
    try {
        let urls = req.query.cart_id;
        
        let cart_id = urls[1];
        let add_id = urls[3];
        console.log(add_id,"this is add_id","this",cart_id)
        const order_obj = {}
        if (cart_id!=undefined){
            let user_id = req.user_id.id;
            order_obj["user_id"] = user_id;
            order_obj["shipping_cart_id"] = cart_id;
            order_obj["address_id"] = add_id; b
            let order_id = await knex('orders').insert(order_obj);
            res.send({Your_order_created_with_id:order_id[0]})
        }else{
            res.send({msg:"Plz select the items first"})
        }
        
    } catch (error) {
        console.log(error)
        res.send({err_msg: error})
    }
}


exports.myorders = async (req,res) =>{
    try {
    
        let data = await knex('orders').select('*')
        const your_orders = []
        var amount = 0
        for (let i = 0; i < data.length; i++){
            let cart_id = data[i].shipping_cart_id
            let each_product_details = await knex('shopping_cart').select("*").where('id',cart_id);
            each_product_details[0]['order_id'] = data[i].id;
            let price = parseInt(each_product_details[0].price)
           amount+= price
            your_orders.push(each_product_details[0])
        }
        res.send({your_orders_are:your_orders,Total_amount:amount})
    } catch (error) {
        res.send({errMsg:error})
    }
}


exports.display_orders_by = async (req,res) =>{
    try {
        let order_id = req.params.id;
        let data = await knex('orders').select('*').where('id',order_id);
        if (data.length!=0){
            let cart_id = data[0].shipping_cart_id;
            let product_details = await knex('shopping_cart').select("*").where('id',cart_id);
            product_details[0]['order_id'] = order_id;
            res.send(product_details)
        }else{
            res.send({Msg:"NO such products found"})
        }
    } catch (error) {
        console.log(error)
     res.send({erMsg:error})   
    }
    
}