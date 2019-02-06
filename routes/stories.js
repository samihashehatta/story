const express= require('express');
const router = express.Router();
const {ensureAuth,ensureG} = require('../helpers/auth');
const mongoose =require('mongoose');
const User =require('../models/User');
const Story = require('../models/Story');
// Index
router.get('/',(req,res)=>{
     Story.find({status:'pub'})
     .populate('user')
     .then(stories=>{
          res.render('stories',{stories:stories})

     })
});


//add story form 

router.get('/add',ensureAuth,(req,res)=>{
     
     res.render('stories/add')
});
router.post('/',(req,res)=>{
     let allowComment ;
     if(req.body.allow){
          allowComment =true;
     }
     else
     {
          allowComment = false;
     }
     const newStory={
          title:req.body.title,
          body:req.body.body,
          status:req.body.status,
          allow:allowComment,
          user:req.user.id
     };
     new Story(newStory)
     .save()
     .then(story =>{
          res.redirect(`/stories/show/${story.id}`)
     });
     
});
// edit 
router.get('/edit/:id',ensureAuth,(req,res)=>{
     res.render('stories')
});


router.get('/show/:id',(req,res)=>{
     res.send('sm')
});




module.exports =router;