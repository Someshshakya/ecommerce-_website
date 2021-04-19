const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1', 
      user : 'root',
      password : '',
      database : 'ecommerce_master'
    }
  },
  console.log('Master database connected..'));
module.exports = knex;


// {   "first_name" : "Raja",
//     "last_name" : "Ram",
//     "email" : "rajaRam@gmail.com",
//     "phone" : 1234565432,
//     "password" : "hello somesh"
// }