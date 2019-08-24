const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
    subject : {
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:boolean,
        default:'pub'
    },
    allow:{
        type:Boolean,
        default:true
    },
    comments:[{
     type:string ,
      x : getfunction()+1223 ;
    }],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    },

});


const Story = mongoose.model('Story',storySchema,'stories');
module.exports = Story;