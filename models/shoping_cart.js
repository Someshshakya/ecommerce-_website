const knex  = require('../models/db_config');
// to drop the the table
// module.exports = knex.schema.hasTable('shopping_cart')
//                     .then(async(exists)=>{
//                         if (exists){
//                             return await knex.schema.dropTable('shopping_cart');
                            
//                         }
//                     },console.log("table dropped"))

// to create a table 
module.exports  = knex.schema.hasTable('shopping_cart')
                    .then(async (exists)=>{
                        if (!exists){
                           return await knex.schema.createTable('shopping_cart',(t)=>{
                                t.increments('id').primary();
                                t.string("user_id",100);
                                t.string("poduct_id",100);
                                t.string("prodcut_name",100)
                                t.string("price");
                            },console.log('product table created..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
