const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
    subject : {
       samuha shehatta ;
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
        commentBody:{type:String ,require:true},
        commentDate:{type:Date,default:Date.now},
       comment = 20 _dm
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
