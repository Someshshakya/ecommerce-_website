var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
module.exports = class{
    async create_db(db_name){
    // var db = false;
    con.connect(function (err) {
      if (err){
        console.log(err);
      }else{
          con.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`, async (err, result) => {
            if (err) throw err;
            console.log(`Created your db with name :- ${db_name}`)
          });
      }
        });
    return true
  };

}

// db_config.schema.hasTable('shop_product')
//                     .then(async (exists)=>{
//                         if (!exists){
//                            return await db_config.schema.createTable('shop_product',(t)=>{
//                             t.increments('id').primary();
//                                 t.string('product_name');
//                                 t.string('price');
//                                 t.string('description');
//                                 t.string('size');
//                                 t.string('color');
                                // t.integer("category_id").unsigned();
                                // t.foreign('category_id').references('id').inTable('category');
//                                 t.integer("Skeeper_id").unsigned();
//                                 t.foreign('Skeeper_id').references('id').inTable('Skeeper_product');
//                             },console.log('shopkkeepers product table created..'))
//                         }
//                     }).catch((err)=>{
//                         console.log(err)
//                     })



// const knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1', 
//     user : 'root',
//     password : '',
//     database : 'sea'
//   }
// },
// console.log('Master database connected..'));
// module.exports = knex;