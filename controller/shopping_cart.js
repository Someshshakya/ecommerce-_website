const knex = require('../models/db_config');
// t.string("user_id",100);
// t.string("poduct_id",100);
// t.string("prodcut_name",100)
// t.string("price");
exports.add_product = async (req,res)=>{
    try {
        let user_id = req.user_id.id;
        const product_boj = {};
        product_boj['user_id'] = user_id;
        console.log(req.params.id);

        const data = await knex('product').select('*')
                                                    .where('id',req.params.id)
        product_boj['poduct_id'] = data[0].id;
        product_boj['prodcut_name'] = data[0].product_name;
        product_boj['price'] = data[0].price;
        await knex('shopping_cart').insert(product_boj)

        res.send({Your_product_added_successfully:product_boj})
    // res.send({msg:product_detail})
    } catch (error) {
        res.send({err_msg:error})   
    }   
}


// to display user's orders
exports.myorder = async(req,res)=>{
    try {
        let user_id = req.user_id.id;
        const mydata = await knex('shopping_cart').select('*').where('user_id',user_id);
        if (mydata.length!=0){
            res.send({listOf_items_in_a_cart_:mydata})
        }else{
            res.send({Sorry:"You have not selected any products"})
        }
    } catch (error) {
        res.send({errMsg:error})
    }
}

// to display your total amount
exports.payment = async(req,res)=>{
    try {
        let user_id = req.user_id.id;
        var total_amount = 0;
        let amount = await knex('shopping_cart').select("price").where('user_id',user_id);
        for (let i = 0; i<amount.length;i++){
            let price = parseInt(amount[i].price)
            total_amount += price
        }
        res.send({Total_amount:total_amount})

    } catch (error) {
        res.send({errMsg:error})
    }
}