const express= require('express');
const router = express.Router();
const {ensureAuth,ensureG} = require('../helpers/auth');

// Index
router.get('/',(req,res)=>{
     res.render('stories')
});


//add story form 

router.get('/add',ensureAuth,(req,res)=>{
     res.render('stories/add')
});

// edit 
router.get('/edit/:id',ensureAuth,(req,res)=>{
     res.render('stories')
});





module.exports =router;