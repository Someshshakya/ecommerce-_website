require('dotenv').config();
const passport = require('passport');
const Strategy_google = require('passport-google-oauth2').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
passport.use(new Strategy_google({
    clientID : process.env.GOOGLE_CLIENT_ID ,
    clientSecret :process.env.GOOGLE_CLIENT_SECRETE ,
    callbackURL : process.env.CALL_BACK_URL,
    passReqToCallback : true
},function(request, accessToken, refreshToken, profile,done){
    console.log("this is accessToken",request)
    return done(null,profile)
}
));
