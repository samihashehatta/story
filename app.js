const express =require('express');
const mongoose =require('mongoose');
const app = express();
const databaseURL= 'mongodb://samiha:SAM3000sam@ds239703.mlab.com:39703/storyteller' || 'mongodb://localhost/storybook';
const port = process.env.port || 3000;
mongoose.connect(databaseURL,{useNewUrlParser: true })
.then(()=>{
console.log('database is connected');
});


app.get('/',(req,res)=>{
    res.send('sam')
});











app.listen(port,()=>{
console.log('connected')
});