
const send_otp = require('../twilio');
const jwt = require('jsonwebtoken');
const knex = require('../models/db_config')
const bcrypt = require('bcrypt');
const moment = require('moment');
// to display home page
exports.homePage = (req,res)=>{
    res.send({msg: "you are welcome on Home page...  "})
}


// to create a user 
exports.registration = async(req,res)=>{
        try {
            let body = req.body;
            let no_ = "+91" + body.phone;
            let otp = await send_otp(no_);
                        
            function users_details(first_name, last_name ,email, phone, password, address, CreatedDate, LastModifiedDate) {
                this.first_name = first_name;
                this.last_name = last_name;
                this.email = email;
                this.phone = phone;
                this.password = password;
                this.address = address;
                this.CreatedDate = CreatedDate;
                this.LastModifiedDate = LastModifiedDate;
            }
            // data from the  body
            var i = req.body;
            // to bcrypt the password!
            var password = i.password;
            if (password!=undefined){
                passowrd = await bcrypt.hash(password,10,);
                var CreatedDate = moment().format("YYYY MM DD");
                var LastModifiedDate = moment().format("YYYY MM DD");
                var user_data = new users_details(i.first_name, i.last_name, i.email, i.phone, passowrd, i.address, CreatedDate, LastModifiedDate)
                let id = await knex('users').insert(user_data);
                res.cookie('otp',otp);
                console.log(`${user_data.first_name} ${user_data.last_name} Registered Successfully... `)
                res.send({Msg : `${user_data.first_name} ${user_data.last_name} Registered Successfully... `})
            
            }else{
                res.send({msg:"Enter your deatils!"})
            }
            // to create the create_date with moment() npm 
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
                    if (req.body.email!=undefined){
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
                                
                                console.log({msg:"you logged in successfully... 😄"});
                                res.send({msg:"you logged in successfully... 😄"})
                            }else{
                                res.send({msg: "your passowrd is incorrect..."})
                            }
                        }else{
                            console.log('plz Signup first ....😄')
                            res.send({msg:"plz Signup first ....😄"})
                        }    
                    }else{
                        res.send({msg:"plz enter you email and password!"})
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