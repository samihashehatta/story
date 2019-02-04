const express =require('express');
const mongoose =require('mongoose');
const app = express();
const databaseURL= 'mongodb://samiha:SAM3000sam@ds239703.mlab.com:39703/storyteller' || 'mongodb://localhost/storybook';
const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    res.send('sam')
});











app.listen(port,process.env.IP,()=>{
console.log('connected')
});