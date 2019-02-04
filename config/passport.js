const GoogleStr = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Key =require('./keys');




module.exports=function(passport){
    passport.use(
        new GoogleStr({
            clientID:Key.googleClientID,
            clientSecret:Key.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy:true
        },//google strategy
        (accessToken,refreshToken,profile,done)=>{
            
        })
        
        )//passpot.use end 
}