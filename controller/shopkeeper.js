const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util');
const knex = require('../models/db_config');


const db_connection = require('../models/shopkeeper_db/shopkeeper_db');
const Services = new db_connection();
const to_connect_db = require('../models/shopkeeper_db/shopkeeper_product');
const Connectt = new to_connect_db();
// to create a shop for shoperkeeper
exports.create_shop = async (req, res) => {
    try {
        let owner_name = req.body.shopkeeper_name;
        if (owner_name != undefined) {
            const newName = owner_name.split(" ").join("_") + "_shope_tec";
            // this will create your new database for individuals shopkeeper
            const con = function connect_db() {
                let name = req.body.shopkeeper_name;
                const db_name = name.split(" ").join("_") + "_shope_tec";
                const db_config = require('knex')({
                    client: 'mysql',
                    connection: {
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: `${db_name}`
                    }
                },
                    console.log(`${db_name} database connected..`));
                db_config.schema.hasTable('shop_product')
                    .then(async (exists) => {
                        if (!exists) {
                            return await db_config.schema.createTable('shop_product', (t) => {
                                t.increments('id').primary();
                                t.string('product_name');
                                t.string('price');
                                t.string('description');
                                t.string('size');
                                t.string('color');
                                t.integer("Skeeper_id").unsigned();
                                t.foreign('Skeeper_id').references('id').inTable('ecommerce_master.shopkeer_details');
                            }, console.log('shopkkeepers product table created..'))
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    db_config.schema.hasTable('orders_recieved')
                    .then(async (exists) => {
                        if (!exists) {
                            return await db_config.schema.createTable('orders_recieved', (t) => {
                                t.increments('id').primary();
                                t.string('buyer_id');
                                t.string('product_id');
                                t.string('shopkeer_id');
                                t.string('size');
                                t.string('color');
                            }, console.log('orders_recieved table created successfully! '))
                        }
                    }).catch((err) => {
                        console.log(err)
                    })



            }
            // wait for 5 sec to create the db
            setTimeout(con, 4000);
            await Services.create_db(newName);
            // await Connectt.toCreate_table(c)
            

            // to create the table to register shopkeepers in db
            // require('../models/shopkeeper_db/shop_conifg');
            function shopkeeper(LastModifiedDate, CreatedDate, isDeleted, user_id, db_name, shopkeeper_name, email, shop_name, description, gst_no, address_line_1, address_line_2, state, city, country, mobile_no, pin_code) {
                this.LastModifiedDate = LastModifiedDate;
                this.CreatedDate = CreatedDate;
                this.isDeleted = isDeleted;
                this.user_id = user_id;
                this.db_name = db_name;
                this.shopkeeper_name = shopkeeper_name;
                this.email = email;
                this.shop_name = shop_name;
                this.description = description;
                this.gst_no = gst_no;
                this.address_line_1 = address_line_1;
                this.address_line_2 = address_line_2;
                this.state = state;
                this.city = city;
                this.country = country;
                this.mobile_no = mobile_no;
                this.pin_code = pin_code;
            }
            var b = req.body;
            var user_id = req.user_id.id;
            var user_id = req.user_id.id;
            var LastModifiedDate = null;
            var CreatedDate = moment().format("YYYY MM DD");
            var isDeleted = 0;
            let newShopkeeper = new shopkeeper(LastModifiedDate, CreatedDate, isDeleted,  user_id, newName, b.shopkeeper_name, b.email, b.shop_name, b.description, b.gst_no, b.address_line_1, b.address_line_2, b.state, b.city, b.country, b.mobile_no, b.pin_code);
            const Shopkeeper_id = await knex('shopkeer_details').insert(newShopkeeper);
            if (Shopkeeper_id != 0) {
                let keeper_id = Shopkeeper_id[0];
                res.cookie('sKeeper_id', keeper_id);
            }
            // require('../models/shopkeeper_db/shopkeeper_product');

            res.send({ msg: "You have been Registered SuccessFully >>>>> " })
        } else {
            res.send({ msg: "Plzzz Enter the name of the owner" })
        }

    } catch (error) {
        console.log(error)
        res.send({ err_msg: error })
    }
}

// to insert the product in the individuals databases
exports.insert_product = async (req, res) => {
    try {
        function product(product_name, description, price, size, color, Skeeper_id) {
           this.product_name = product_name;
            this.description = description;
            this.price = price;
            this.size = size;
            this.color = color;
            this.Skeeper_id = Skeeper_id;
        }
        var i = req.body;
        let user_id = req.user_id.id;
        let skeeper_details = await knex('shopkeer_details').select("id","db_name")
                                                        .where('user_id',user_id);
        // to make configuration with db to insert products
        async function to_make(){
            let user_id = req.user_id.id;
            let skeeper_details = await knex('shopkeer_details').select("id","db_name")
                                                        .where('user_id',user_id);
            let db_name = skeeper_details[0].db_name;
                const db_config = require('knex')({
                    client: 'mysql',
                    connection: {
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: `${db_name}`
                    }
                },
                    console.log(`${db_name} database connected..`));
                    return db_config;
        }   
                  
        if (skeeper_details.length!=0){
            let s_id = skeeper_details[0].id;
                let product_details = new product(i.product_name, i.description, i.price, i.size, i.color, s_id)
                let configuration_db = await to_make();
                await configuration_db('shop_product').insert(product_details)
                .catch((err)=>{
                    console.log("this is error while inserting products",err);
                    res.send({product_insert_err:err})
                })
                // to send the success message for product inerstions
                res.send({msg:"Your product Inserted Successfully!"})
                    
            // res.send("wrking")
        }else{
            res.send({msg:"Plz login first"})
        }
    } catch (error) {
        console.log(error)
        res.send({ err_msg: { here_Is_the_err: error } })
    }
}


// to delete the product
exports.delete_product = async (req, res) => {
    try{
            async function to_make(){
                let user_id = req.user_id.id;
                let skeeper_details = await knex('shopkeer_details').select("db_name")
                                                            .where('user_id',user_id);
                    
                let db_name = skeeper_details[0].db_name;
                    const db_config = require('knex')({
                        client: 'mysql',
                        connection: {
                            host: '127.0.0.1',
                            user: 'root',
                            password: '',
                            database: `${db_name}`
                        }
                    },
                        console.log(`${db_name} database connected..`));
                        return db_config;
            }
            let user_id = req.user_id.id;
            const skeeper_details = await knex('shopkeer_details').select("id")
                                                            .where('user_id',user_id);
            if (skeeper_details.length!=0){
                    let skeeper_id = skeeper_details[0].id;      
                    let product_id = req.params.id;
                    let configuration_db = await to_make();
                    await configuration_db('shop_product').del().where('id',product_id)
                                                                .where('skeeper_id',skeeper_id)
                    .catch((err)=>{
                        console.log("this is error while deleting products",err);
                        res.send({product_deleting_err:err})
                    })
                    // to send the success message for product inerstions
                    res.send({msg:"Your product deleted Successfully!"})
                        
            }else{
                res.send({msg:"Plz login first"})
            }
    } catch (error) {
        console.log(error)
        res.send({ err_msg: { here_Is_the_err: error } })
    }
}

exports.update_product = async (req,res) =>{
    try {
        function product(product_name, description, price, size, color, Skeeper_id) {
           this.product_name = product_name;
            this.description = description;
            this.price = price;
            this.size = size;
            this.color = color;
            this.Skeeper_id = Skeeper_id;
        }
        var i = req.body;
        let user_id = req.user_id.id;
        let skeeper_details = await knex('shopkeer_details').select("id","db_name")
                                                        .where('user_id',user_id);
        // to make configuration with db to insert products
        async function to_make(){
            let user_id = req.user_id.id;
            let skeeper_details = await knex('shopkeer_details').select("id","db_name")
                                                        .where('user_id',user_id);
            let db_name = skeeper_details[0].db_name;
                const db_config = require('knex')({
                    client: 'mysql',
                    connection: {
                        host: '127.0.0.1',
                        user: 'root',
                        password: '',
                        database: `${db_name}`
                    }
                },
                    console.log(`${db_name} database connected..`));
                    return db_config;
        }   
                  
        if (skeeper_details.length!=0){
            let s_id = skeeper_details[0].id;
                let product_details = new product(i.product_name, i.description, i.price, i.size, i.color, s_id)
                let configuration_db = await to_make();
                console.log("this is url id",req.params.id)
                await configuration_db('shop_product').update(product_details)
                                                        .where('id',req.params.id)
                .catch((err)=>{
                    console.log("this is error while editing products",err);
                    res.send({product_editing_err:err})
                })
                // to send the success message for product inerstions
                res.send({msg:"Your product Updated Successfully!"})
                    
        }else{
            res.send({msg:"Plz login first"})
        }
    } catch (error) {
        console.log(error)
        res.send({ err_msg: { err_in_outer_catch: error } })
    }
}