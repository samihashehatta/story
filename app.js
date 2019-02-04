const express =require('express');
const mongoose =require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes =  require('./routes/auth');
const passport =require('passport');
const passportConfig = require('./config/passport');


passportConfig(passport);

app.get('/',(req,res)=>{
    res.send('sam')
});









app.use('/auth',authRoutes);

app.listen(port,process.env.IP,()=>{
console.log('connected')
});