const knex = require('./db_config')
// to drop the the table
module.exports = knex.schema.hasTable('users')
                        .then(async (exists)=>{
                            if (exists){
                            return await knex.schema.alterTable('users',(t)=>{
                                    t.string('google_Id',100);
                                    // t.integer("isDeleted").defaultTo(0);
                                    // t.dropColumn("isDeleted");
                                    // t.string('address',100);
                                    // t.string('CreatedDate');
                                    // t.string('LastModifiedDate');  
                                },console.log('column updated'))
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })

                    
// module.exports  = knex.schema.hasTable('users')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await knex.schema.createTable('users',(t)=>{
//                                 t.increments('id').primary();
//                                 t.string("first_name",100);
//                                 t.string("last_name",100);
//                                 t.string("email",100).unique().notNullable();
//                                 t.string("password");
//                                 t.string("status").defaultTo(0);
//                                 t.integer("is_shop").defaultTo(0);
//                                 t.integer("phone");
//                                 t.integer("isDeleted").defaultTo(0);
//                                 t.string('address',100);
//                                 t.string('CreatedDate');
//                                 t.string('LastModifiedDate'); 
                                // t.string('google_Id,100);
                                    
//                             },console.log('table created'))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })
                   

                //     {   "first_name" :"Somesh",
                //     "last_name" : "shakya",
                //     "email" : "somesh@gmai.com",
                //     "address" : "c-240 pandav nagar delhi 92"
                //     "phone" : 1234565432,
                //     "password" : "hello somesh"
                // }