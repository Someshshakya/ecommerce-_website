const knex  = require('../models/db_config');

// module.exports = knex.schema.hasTable('orders')
//                     .then(async(exists)=>{
//                         if (exists){
//                             return await knex.schema.table('orders',(t)=>{
//                                 t.dropColumn('phone');
//                                 // t.integer("address_Id").unsigned();
//                                 // t.foreign('address_Id').references('id').inTable('users_address');
//                             },console.log('table updated .'))
//                         }
//                     })
// module.exports  = knex.schema.hasTable('orders')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await knex.schema.createTable('orders',(t)=>{
//                                 t.increments('id').primary();
//                                 t.string("user_id",100);
//                                 t.string("shipping_cart_id",100);
//                                 t.string("complete_address",100)
//                                 t.integer("phone");
//                             },console.log('orders table created..'))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })


