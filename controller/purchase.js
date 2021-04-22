// master db required
const knex = require('../models/db_config');

exports.purchase_product = async (req,res)=>{
    try {
        res.send({msg:"Here you can work for purchase of the product:!"})
    } catch (error) {
        console.log(error)
        res.send({er_msg:error})
    }
}
