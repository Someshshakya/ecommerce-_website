const express = require('express');
const passport = require('passport');
const router = express.Router();


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

router.get('/google/success', (req, res)=>{
    var user_detail = req.session;
    let i = user_detail.passport.user._json;
    var user_data = {name:"",email:"",pic:""}
    user_data.name = i.name;
    user_data.email = i.email;
    user_data.pic = i.picture

    // res.render('pages/success',{data:user_data})
    res.send({User_details:req.session})
})

// if fails then show failure
router.get('/google/failure',(req,res)=>{
    res.send({msg:"Ops you failed!"})
})

router.get('/logout',(req,res)=>{
        req.session = null;
        req.logout();
        res.redirect('/');
})


module.exports = router;