const knex  = require('../models/db_config');
// to create a table

// module.exports  = knex.schema.hasTable('users_address')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await knex.schema.createTable('users_address',(t)=>{
//                             t.increments('id').primary();
//                             t.string('complete_address');
//                             t.integer('phone');
//                             t.integer("user_id").unsigned();
//                             t.foreign('user_id').references('id').inTable('users');
//                             },console.log("user's address table created "))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })
