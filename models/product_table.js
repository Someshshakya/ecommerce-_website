const knex  = require('../models/db_config');
// to drop the the table
// module.exports = knex.schema.hasTable('product')
//                     .then(async(exists)=>{
//                         if (exists){
//                             return await knex.schema.dropTable('product');
                            
//                         }
//                     },console.log("table dropped"))

// to create a table 
module.exports  = knex.schema.hasTable('product')
                    .then(async (exists)=>{
                        if (!exists){
                           return await knex.schema.createTable('product',(t)=>{
                            t.increments('id').primary();
                                t.string('product_name');
                                t.string('price');
                                t.string('description');
                                t.string('size');
                                t.string('color');
                                t.integer("category_id").unsigned();
                                t.foreign('category_id').references('id').inTable('category');
                            },console.log('product table created..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
