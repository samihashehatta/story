module.exports ={
    ensureAuth:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/')
    },
    ensureG:function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }
        else{
            return next();
        }
    },

}