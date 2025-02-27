import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
    minlength: 3,
    maxlength: 50,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    minlength: 6,
    select: false
},
channel:{
  type:String,
  minlength: 3,
  maxlength: 50,
},
Description:{
  type:String,
},
DOB:{
    type:Date,
    required:true
},
gender:{
  type:String
},
verificationCode:{
},
profilePicture: {
type: String, 
},
subscribers: {
type: Number,
default: 0, 
},
subscribedToChannels: [
{
type: mongoose.Schema.Types.ObjectId,
ref: 'user',
},
],
playlists: [
{
name: { type: String, required: true },
privacy:{
  type:String,
  default:'Public',
}, 
videos: [
{type: mongoose.Types.ObjectId,
  ref: 'video', },
  ],
    } , 
   ],
likedVideos: [
{
type: mongoose.Schema.Types.ObjectId,
ref: 'video', 
},
],
history: {
shorts_history:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'short',
  
}]
,videoHistory :[{
type: mongoose.Schema.Types.ObjectId,
ref: 'video',
}],
},
Downloads:[
  { type:mongoose.Schema.ObjectId ,
    ref:'video'
   }
],
WatchLater:{
  videos : [{  type:mongoose.Schema.ObjectId ,
  ref:'video'
}],
shorts : [{  type:mongoose.Schema.ObjectId ,
  ref:'short'
}]
} ,
uploadedVideos:[{
  type:mongoose.Schema.ObjectId,
  ref:'video'
}],

isVerified:{
    type:Boolean,
    default:false
},
verficationCode:String,
 updatedAt: {
    type: Date,
    default: Date.now,
  },

    
},{timestamps:true}  )




export default mongoose.model('user',userSchema)