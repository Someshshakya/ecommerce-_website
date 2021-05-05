const knex  = require('../models/db_config');

module.exports  = knex.schema.hasTable('shopping_cart')
                    .then(async (exists)=>{
                        if (!exists){
                           return await knex.schema.createTable('shopping_cart',(t)=>{
                                t.increments('id').primary();
                                t.string("user_id",100);
                                t.string("product_id",100);
                                t.string("delievery_date");
                                t.string("LastModifiedDate");
                                t.string("CreatedDate");
                                t.string("isDeleted");
                                t.integer("shop_id").unsigned();
                                t.foreign('shop_id').references('id').inTable('shopkeer_details');

                            },console.log('shoping cart  table created..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
