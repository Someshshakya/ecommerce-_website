const knex = require('../models/db_config');

exports.create_address = async (req,res)=>{
    function users_address(user_id, complete_address, phone) {
        this.user_id = user_id;
        this.complete_address= complete_address;
        this.phone = phone;
    }
    try {
        if (Object.keys(req.body).length === 0){
            res.send({Msg:"Plz enter your address"})
        }else{
            var body = req.body;
            var addre = new users_address(req.user_id.id,body.complete_address,body.phone);
            let user_id = req.user_id.id;           
            await knex('users_address').insert(addre).where('user_id',user_id);
            console.log({msg:"Your address added successfuly!"})
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