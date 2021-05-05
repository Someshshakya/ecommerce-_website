const express = require('express');
const passport = require('passport');
const router = express.Router();
const knex = require('../../models/db_config');
const jwt = require('jsonwebtoken')
const Verify = require('../../Auth/jwt')


// to redirect on select google accounts
router.get('/google',
 passport.authenticate('google', { scope:
     ['profile', 'email'] }));

     // to check success or failure after entring the google acount details
router.get('/google/users',
    passport.authenticate( 'google', {
        failureRedirect: '/google/failure',
        successRedirect: '/google/success'
}));


// if success then show user details

router.get('/google/success', async (req, res)=>{
    var user_detail = req.session;
    let i = user_detail.passport.user._json;
    var user_data = {name:"",email:"",pic:""}
    user_data.name = i.name;
    user_data.email = i.email;
    user_data.pic = i.picture

    var user_det = {first_name:"",last_name:"",email:"",google_Id:""}
    user_det.first_name = i.given_name;
    user_det.last_name = i.family_name;
    user_det.email = i.email;
    user_det.google_Id = i.sub;
    try {
        var got_id = null;
    
        var id_de = await knex('users').select('id')
                                        .where('email',user_det.email);
        if (id_de.length!=0){
            got_id = id_de[0].id;
        }else{
            var id = await knex('users').insert(user_det);
            got_Id = id[0];
        }
        if (got_id){
            let pay = {
                "id" :id
                }
            let token = await jwt.sign(pay,"Your_secret_key");
            res.cookie("user_token",token);
            console.log({msg:"you logged in successfully... 😄"});
            res.render('pages/success',{data:user_data})
            // res.send({User_details:user_detail.passport})
        }else{
            res.send("login failed")
        }
    
    } catch (error) {
        console.log(error)
        res.send({erms:error})
    }
})


router.get('/google/success/working',Verify,async(req,res)=>{
    console.log(req.user_id)
    res.send({msg:"YOu have win!"})
})
// if fails then show failure
router.get('/google/failure',(req,res)=>{
    res.send({msg:"Ops you failed!"})
})

router.get('/logout',(req,res)=>{
        res.clearCookie("id");
        res.clearCookie("otp");
        res.clearCookie("user_token");
        req.session = null;
        req.logout();
        res.redirect('/');
})


module.exports = router;