const jwt = require('jsonwebtoken');
module.exports = async (req,res,next)=>{
    let token = req.cookies.user_token;
    if (token!=undefined){
        let user_id = await jwt.verify(token,'Your_secret_key');
        req.user_id = user_id;
        next()
    }else{ 
        res.send({login_msg:"Plz login"})
    }
}