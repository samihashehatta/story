const express = require('express');
const router = express.Router();
const {ensureAuth,ensureG} = require('../helpers/auth');
const Story = require('../models/Story');
const mongoose =require('mongoose');
router.get('/',ensureG,(req,res)=>{
    res.render('index')
});
router.get('/dashboard',ensureAuth,(req,res)=>{
    Story.find({user:req.user.id})
    .then(stories=>{
        res.render('index/dashboard',{
            stories
        })

    })
});

router.get('/about',(req,res)=>{
    res.render('index/about')
});
module.exports =router;