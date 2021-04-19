const { response } = require('express');
const knex = require('../models/db_config');

exports.dispaly_with_cat = async(req,res)=>{
    const list_of_products = await knex.from('product')
                                                .select("*");
    
    if (list_of_products.length!=0){
        res.send({List_of_all_Products:list_of_products})
    }else{
        res.send({msg:"Ops There is no data found"})
    }
}


exports.display_cat = async (req,res)=>{
  try {
    const types_of_cat = await knex('category').select("*")
    if (types_of_cat.length!=0){
        res.send({Types_of_category:types_of_cat})
    }else{
        res.send({msg:"Ops no catrogries found"})
    }
  } catch (error) {
      res.send({err_msg:error})
  }
}

exports.cat_by_id = async (req,res)=>{
    try {
        let id = req.params.id;
        let cat = await knex('category').select("*")
                                        .where('id',id)
        if (cat.length!=0){
            res.send({Here_is_Your_category:cat})
        }else{
            res.send({msg:"Ops no catrogries found"})
        }
    } catch (error) {
        res.send({err_msg:error})
    }
}