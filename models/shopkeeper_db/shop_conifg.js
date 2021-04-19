const knex  = require('../db_config');

// uncomment this to add new column
module.exports = knex.schema.hasTable('shopkeer_details')
                .then(async (exists)=>{
                    if (!exists){
                        return await knex.schema.alterTable('shopkeer_details',(t)=>{
                            t.string("db_name")
                        },console.log('user_id field added in the shopkeeprs_details '))
                    }
                }).catch((err)=>{
                    console.log(err)
                })

// module.exports  = knex.schema.hasTable('shopkeer_details')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await knex.schema.createTable('shopkeer_details',(t)=>{
//                             t.increments('id').primary();
//                                 t.string('shopkeeper_name')
//                                 t.string('shop_name');
//                                 t.string('description');
//                                 t.string('gst_no');
//                                 t.string('address_line_1');
//                                 t.string('address_line_2');
//                                 t.string('state');
//                                 t.string('city');
//                                 t.string('country');
//                                 t.string('email').unique();
//                                 t.integer('mobile_no')
//                                 t.integer('pin_code');
//                             },console.log('shopkeeper table created..'))
//                         }
                    // }).catch((err)=>{
                    //     console.log(err)
                    // })
