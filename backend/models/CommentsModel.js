import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

video:{
type:mongoose.Types.ObjectId,
ref:"video",
required:true
},
numberOfviews:{
type : [String],
default: []
},
commentText:[{
user:{
    type: mongoose.Types.ObjectId,
    ref:'user'
    },
text:{
    type:String
},
commentLikes:[
{   type: mongoose.Types.ObjectId,
    ref:'user',
    default:[]

 }
],
commentDisLikes:[
    {   type: mongoose.Types.ObjectId,
        ref:'user',
        default:[] 
    }
]
}],
timestamp: {
type: Date,
default: Date.now,
},
likes: {
type: [ String],
default:[]
},
disLikes: {
type: [String],
default:[]
},
});


export default mongoose.model("comments" , commentSchema )