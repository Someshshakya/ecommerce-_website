
const send_otp = require('../twilio');
const jwt = require('jsonwebtoken');
const knex = require('../models/db_config')
const bcrypt = require('bcrypt');
// to display home page
exports.homePage = (req,res)=>{
    res.send({msg: "you are welcome on Home page...  "})
}


// to create a user 
exports.registration = async(req,res)=>{
        try {
            let user_data = req.body;
            let password = user_data.password;
            let no_ = "+91" + user_data.phone;
            let otp = await send_otp(no_);
            
            console.log("otp:- ",otp)
            user_data['password'] = await bcrypt.hash(password,10)
            let id = await knex('users').insert(user_data);
            console.log("user id " ,id)
            res.cookie('otp',otp);
            res.cookie('id',id[0])
            res.send({Msg : `${user_data.first_name} ${user_data.last_name} Registered Successfully... `})
            
        } catch (error) {
            console.log(error);
            res.send({err_msg:error})
        }
    }

// to verify the user 
exports.Usrs_verification = async(req,res)=>{
        let otp = req.cookies.otp;
        let id = req.cookies.id;
        let User_otp = req.body.otp;
        if (otp==User_otp){
            await knex('users').update("status",true)
            .where('id',id)
            res.clearCookie("id");
            res.clearCookie("otp");
            res.send({msg: "You have been verified Successfully!  "})
        }else{
            res.send({Not_Valid: "Your OTP is not valid!"})
        }
    }

// To login the user
exports.user_login =  async (req,res)=>{
                try {
                    var passwordd = req.body.password;
                    let emaill = req.body.email;
                    var user_data = await knex('users').select("*").where('email',emaill)                        
                    if (user_data.length!=0){
                        let hasspas = user_data[0].password;
                        const bol = await bcrypt.compare(passwordd,hasspas)
                        if (bol){
                            let b = user_data[0];
                            let pay = {
                                "id" : b.id
                                }
                            let token = await jwt.sign(pay,"Your_secret_key");
                            res.cookie("user_token",token);
                            res.send({msg:"you logged in successfully... 😄"})
                        }else{
                            res.send({msg: "your passowrd is incorrect..."})
                        }
                    }else{
                        console.log('plz Signup first ....😄')
                        res.send({msg:"plz Signup first ....😄"})
                    }
                } catch (error) {
                    console.log(error);
                    res.send({msg:error})
                }
    }

// To logout the user from the 
exports.logout_user = (req,res)=>{
        res.clearCookie("id");
        res.clearCookie("otp");
        res.clearCookie("user_token");
        res.send("You  successfully logged out!  ")
    }