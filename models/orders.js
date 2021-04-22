const knex  = require('../models/db_config');


// module.exports  = knex.schema.hasTable('orders')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await knex.schema.createTable('orders',(t)=>{
//                                 t.increments('id').primary();
//                                 t.bigInteger('item_id');
//                                 t.bigInteger('shop_id');
//                                 t.integer('placed_date');
//                                 t.integer('delievery_date');
//                                 t.integer('isAmountPaid');
//                                 t.integer('LastModifiedDate');
//                                 t.integer('CreatedDate');
//                                 t.integer('isDeleted');
//                                 t.bigInteger("user_id").unsigned();
//                                 t.foreign('user_id').references('users')
//                             },console.log('orders table created..'))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })


