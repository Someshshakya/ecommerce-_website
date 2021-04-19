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
                        if (exists){
                           return await knex.schema.table('category',(t)=>{
                                t.dropForeign("product_id", "product_id")
                                t.dropColumn('product_id');
                            },console.log('coloumn dropped..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
