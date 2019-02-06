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
     .sort({date:'desc'})
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
     Story.findById({
          _id:req.params.id
     })
     .then(story=>{
          if(story.user != req.user.id)
          {
               res.redirect('/stories')
          }
          else{
               res.render('stories/edit',{
                    story:story
               })
          }
        
         
     })
});

router.put('/:id',(req,res)=>{
     Story.findById({_id:req.params.id})
     .then(story=>{
          let allowComment ;
          if(req.body.allow){
               allowComment =true;
          }
          else
          {
               allowComment = false;
          }
          story.title=req.body.title,
          story.body=req.body.body,
          story.status=req.body.status,
          story.allow=allowComment,
          story.save()
          .then(story=>{
               res.redirect('/dashboard')
          })
     });
});


router.get('/show/:id',(req,res)=>{
     Story.findById({
          _id:req.params.id
     })
     .populate('user')
     .populate('comments.commentUser')
     .then(story=>{
          if(story.status == 'pub'){

          
          res.render('stories/show',{
               story:story
          })
     }else{
          if(req.user){
               if(req.user.id==story.user._id)
               {
                    res.render('stories/show',{
                         story:story
                    }  ) 
               }else
               {
                    res.redirect('/stories')

               }

          }else{
               res.redirect('/stories')
          }
     }
     })
});


//DELETING 
router.delete('/:id',(req,res)=>{
Story.deleteOne({_id:req.params.id})
.then(()=>{
     res.redirect('/dashboard')
})
});



//comment
router.post('/comment/:id',(req,res)=>{
     Story.findById({_id:req.params.id})
     .then(story=>{
          const newComment = {
               commentBody : req.body.commentBody,
               commentUser:req.user.id
          }

          story.comments.unshift(newComment)
          story.save()
          .then(story=>{
               res.redirect(`/stories/show/${story.id}`)
          })

     })
});

// show user stories
router.get('/user/:userId',(req,res)=>{
     Story.find({user:req.params.userId,status:'pub'})
     .populate('user')
     .then(stories=>{
          res.render('stories/index',{stories})
     });
});
//logged user stories
router.get('/my',ensureAuth,(req,res)=>{
     Story.find({user:req.user.id})
     .populate('user')
     .then(stories=>{
          res.render('stories/index',{stories})
     });
});

module.exports =router;