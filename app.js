const express =require('express');
const mongoose =require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes =  require('./routes/auth');
const passport =require('passport');
const passportConfig = require('./config/passport');
const Key = require('./config/keys');
const cookieParser = require('cookie-parser');
const session =require('express-session');
const index = require('./routes/index');
const exphbs =require('express-handlebars');
const storiesRoutes=require('./routes/stories');
const path =require('path');
app.use(express.static(path.join(`${__dirname}/public`)));
//mongoose connect 
mongoose.set('debug' , true);
mongoose.connect(Key.databaseURL,{useNewUrlParser:true})
.then(()=>{
  console.log('mongodb connected ')  
})
.catch((err)=>{
    console.log(err) ;

});
passportConfig(passport);
//middleware for hnadlebars 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// express session 
app.use(cookieParser());
app.use(session({
    secret:'sam',
    resave:false,
    saveUninitialized:false
}));





app.use(passport.initialize());
app.use(passport.session());


//global var 
app.use((req,res,next)=>{
    res.locals.user=req.user || null;
    next();
});


app.use('/',index);
app.use('/auth',authRoutes);
app.use('/stories',storiesRoutes);
app.listen(port,process.env.IP,()=>{
console.log('connected')
});