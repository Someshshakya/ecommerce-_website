const knex = require('../models/db_config');

exports.create_order = async (req,res) =>{
    try {
        var items_id = req.query.items_id;
        var shop_id = req.query.shop_id; 
        if (items_id!=undefined && shop_id!=undefined){
                // to create the object for order's details
            function orders_creat(item_id, shop_id, ){
                this.item_id = item_id;
                this.shop_id = shop_id;
                this.placed_date = placed_date;
                this.delievery_date = delievery_date;
                this.user_id = user_id;
            }
            // inserting item in the orders  
            var items_id = req.query.items_id;
            var shop_id = req.query.shop_id;
            var user_id = req.user_id.id;
            var placed_date = null;
            var delievery_date = null;

            let new_orders = new orders_creat(items_id, shop_id, placed_date, delievery_date, user_id);
            await knex('orders').insert(new_orders);
            res.send({msg:"You have placed your order successfully!"})
        }else{
            res.send({msg:"plz selelct the items first"})
        }
       
        
    } catch (error) {
        console.log(error)
        res.send({err_msg: error})
    }
}


exports.myorders = async (req,res) =>{
    try {
    var user_id = req.user_id.id;
    if (user_id!=undefined){
        let order = await knex('orders').select("item_id","shop_id").where('user_id',user_id)
        var orders_coll = []
        for (i in order){
           let item = order[i].item_id;
           let shop = order[i].shop_id;
           var db_name = await knex('shopkeer_details').select("db_name").where('id',shop)
           db_name = db_name[0].db_name;
           let db_config = require('knex')({
                                client: 'mysql',
                                connection: {
                                host : '127.0.0.1', 
                                user : 'root',
                                password : '',
                                database : db_name
                                }
                            },
                            console.log(`${db_name} database connected..`));
            let item_details = await db_config('shop_product').select('*').where("id",item); 
            orders_coll.push(item_details)
            }
        
        res.send({Your_orders_are:orders_coll})
        // res.send({msg:"Here are yours orders"})
    }

    } catch (error) {
        console.log(error)
        res.send({errMsg:error})
    }
}


exports.display_orders_by = async (req,res) =>{
    try {
        var user_id = req.user_id.id;
        if (user_id!=undefined){
            
            let order = await knex('orders').select("item_id","shop_id").where('user_id',user_id)
                                                                        .where('id',req.params.id)
            var orders_coll = []
            for (i in order){
               let item = order[i].item_id;
               let shop = order[i].shop_id;
               var db_name = await knex('shopkeer_details').select("db_name").where('id',shop)
               db_name = db_name[0].db_name;
               let db_config = require('knex')({
                                    client: 'mysql',
                                    connection: {
                                    host : '127.0.0.1', 
                                    user : 'root',
                                    password : '',
                                    database : db_name
                                    }
                                },
                                console.log(`${db_name} database connected..`));
                let item_details = await db_config('shop_product').select('*').where("id",item); 
                orders_coll.push(item_details)
                }
            
            res.send({Your_orders_are:orders_coll})
            // res.send({msg:"Here are yours orders"})
        }
    
    } catch (error) {
        console.log(error)
     res.send({erMsg:error})   
    }
}

exports.del_order = async (req,res)=>{
    console.log(req.params.id)
    res.send({msg:"Your product delete successfuly!"})
}