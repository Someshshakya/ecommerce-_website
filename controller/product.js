const knex = require('../models/db_config')


// to display list of products
exports.pordut_details = async(req,res)=>{
    try {
        let allProducts = await knex('product').select("*")
        res.send({Here_is_the_List_of_all_Products:allProducts})
    } catch (error) {
        res.send({errMsg:error})
    }
}

// to display a singal product with id
exports.get_by_id = async(req,res)=>{
    try {
        let pro_id = req.params.id;
        let pro_details = await knex('product').select("*")
        res.send({Detils_of_the_Product : pro_details})
    } catch (error) {
        console.log(error)
        res.send({errMsg : error})
    }
}


