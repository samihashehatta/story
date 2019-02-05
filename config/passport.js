const GoogleStr = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Key =require('./keys');
const User = require('../models/User');






module.exports=function(passport){
    passport.use(
        new GoogleStr({
            clientID:Key.googleClientID,
            clientSecret:Key.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy:true
        },//google strategy
        (accessToken,refreshToken,profile,done)=>{
            
            var image=profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
            const newUser ={
                googleID:profile.id,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                email:profile.emails[0].value,
                img:image
            }//end of user object
            
            //check for exiting user
            User.findOne({googleID:profile.id})
            .then(user=>{
                if(user){
                    done(null,user)
                }
                else{
                    //create user 
                    new User(newUser)
                    .save()
                    .then(user=> done(null,user))
                }
            })//end of then
        })//end of google startegy
        
        )//passpot.use end ;
        passport.serializeUser((user, done) =>{
            done(null, user.id);
          });
          
          passport.deserializeUser((id, done)=> {
            User.findById(id)
            .then( user =>{
                done(null , user);
            }) ;
          });//pass.de
    
}