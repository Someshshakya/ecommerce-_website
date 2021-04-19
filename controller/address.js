const knex = require('../models/db_config');

exports.create_address = async (req,res)=>{
    try {
        if (Object.keys(req.body).length === 0){
            res.send({Msg:"Plz enter your message"})
        }else{
            let user_id = req.user_id.id;
            req.body['user_id'] = user_id;            
            let add_id = await knex('users_address').insert(req.body).where('user_id',user_id);
            res.send({msg:"Your address added successfuly!"})
        }
        
        
    } catch (error) {
        console.log(error)
        res.send({er_msg:error})
    }
}

exports.display_adderss = async (req,res)=>{
    try {
        let user_id = req.user_id.id;
        let list_of_address = await knex('users_address').select("*").where("user_id",user_id);
        if (list_of_address.length!=0){
            res.send(list_of_address)
        }else{
            res.send({Ops: "There are no such address save!"})
        }
    } catch (errr) {
        console.log(errr)
        res.send({err_msg:errr})
    }
}