const knex = require('./db_config');
module.exports = knex.schema.hasTable('payment')
                .then(async(exists)=>{
                    if (!exists){
                        return await knex.schema.createTable('payment',(t)=>{
                            t.increments('id').primary();
                            t.integer('order_id').unsigned();
                            t.integer('user_id').unsigned();
                            t.string('signature');
                            t.integer('payment_id');
                            t.foreign('order_id').references('id').inTable('ecommerce_master.orders');
                            t.foreign('user_id').references('id').inTable('ecommerce_master.users');
                        },console.log("Table created with name payments"))
                    }
                })
                .catch((err)=>{
                    console.log('err while creating payment table')
                    console.log(err)
                })
