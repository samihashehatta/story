const express = require('express');
const router = express.Router();
const {ensureAuth,ensureG} = require('../helpers/auth');

router.get('/',ensureG,(req,res)=>{
    res.render('index')
});
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('index/dashboard')
});

router.get('/about',(req,res)=>{
    res.render('index/about')
});
module.exports =router;