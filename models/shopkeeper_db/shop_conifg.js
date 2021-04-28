const knex  = require('../db_config');

// uncomment this to add new column
module.exports = knex.schema.hasTable('shopkeer_details')
                .then(async (exists)=>{
                    if (!exists){
                        return await knex.schema.alterTable('shopkeer_details',(t)=>{
                        //    t.string('db_name');
                           t.integer('user_id').unsigned();
                           t.foreign('user_id').references('id').inTable('users');

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
//                                 t.integer("LastModifiedDate");
//                                 t.integer("CreatedDate");
//                                 t.integer("isDeleted");
//                             },console.log('shopkeeper table created..'))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })


    // {
    //     "shopkeeper_name":"demo",
    //     "shop_name":"sports",
    //     "description":"fit and be Healthy",
    //     "gst_no":"12",
    //     "address_line_1":"c-240 pandav nagar delhi 110092",
    //     "address_line_2":"c-240 pandav nagar delhi 110092",
    //     "state" : "delhi",
    //     "city" : "delhi",
    //     "country" : "India",
    //     "email" : "demo@gmail.com",
    //     "mobile_no" : "8433421817",
    //     "pin_code" : "110091"
    // }
                                    