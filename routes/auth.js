const express = require('express');
const router = express.Router();
const passport =require('passport');


router.get('/google', passport.authenticate('google',{scope:['password','email']}));



router.get('/google/c,sl', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) =>{
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
  

  router.get('/food',(req,res)=>{
    if(req.user){
      console.log(req.user)
    }
    else{
      console.log('not auth')
    }
  });

  router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/')
  });

module.exports =router;  
