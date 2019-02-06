const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
    title : {
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pub'
    },
    allow:{
        type:Boolean,
        default:true
    },
    comments:[{
        commentBody:{type:String ,require:true},
        commentDate:{type:Date,default:Date.now},
        //by refrence
        commentUser:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
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