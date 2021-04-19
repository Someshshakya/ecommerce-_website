
module.exports = class{
    async toCreate_table(db_config){
    db_config.schema.hasTable('shop_product')
                    .then(async (exists)=>{
                        if (!exists){
                           return await db_config.schema.createTable('shop_product',(t)=>{
                            t.increments('id').primary();
                                t.string('product_name');
                                t.string('price');
                                t.string('description');
                                t.string('size');
                                t.string('color');
                                t.integer("category_id").unsigned();
                                t.foreign('category_id').references('id').inTable('category');
                                t.integer("Skeeper_id").unsigned();
                                t.foreign('Skeeper_id').references('id').inTable('Skeeper_product');
                            },console.log('shopkkeepers product table created..'))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
}
// {
//     "product_name" : "I phone",
//     "price" : "23",
//     "description" : "Latest with all new Feature",
//     "size" : "12 cm ",
//     "color" : "Blue"
// }       