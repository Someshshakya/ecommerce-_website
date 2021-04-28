const knex  = require('../models/db_config');
// to drop the the table
// module.exports = knex.schema.hasTable('category')
//                     .then(async(exists)=>{
//                         if (exists){
//                             return await knex.schema.dropTable('category');
                            
//                         }
//                     },console.log("table dropped"))

/////// to create a table 
module.exports  = knex.schema.hasTable('category')
                    .then(async (exists)=>{
                        if (!exists){
                           return await knex.schema.createTable('category',(t)=>{
                            t.increments('id').primary();
                            t.string('category').unique();
                            },console.log('category table dropped..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
