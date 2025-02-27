import mongoose, { Mongoose } from 'mongoose'

const shortsSchema = new mongoose.Schema({

    title:{
        type : String ,
        required:true
    },
    description:{
        type : String ,
        required:true
    },
    thumbnail:{
        type:String
    },
      madeForKids: {
          type: Boolean,
         // required: true,
        },
    channelName:{
    type: mongoose.Types.ObjectId,
    ref:'user'
    }, 
    tags: {
    type: [String], // Array of tags
    },
    language:{
    type: String, 
    },
    recordingDetails: {
    recordedDate: {
    type: Date, // Date when the video was recorded
    },
    location: {
    type: String, // Location string
    },
    },
    category: {
    type: String,
    enum: [
    "Cars and vehicles",
    "Comedy",
    "Education",
    "Entertainment",
    "Film and animation",
    "Gaming",
    "How-to and style",
    "Music",
    "News and politics",
    "Non-profits and activism",
    "People and blogs",
    "Pets and animals",
    "Science and technology",
    "Sport",
    "Travel and events",
    ],
    },
    comments: {
    commentID:{
    type:mongoose.Types.ObjectId,
    ref:'comments'
},
status: {
    type: String,
    enum: ["On", "Off"],
    default: "On",
    },
    viewersComments:{
    type:mongoose.Types.ObjectId,
    ref:"comments"
    }
    },
    allowViewRatings: {
    type: Boolean,
    default: true, // Whether to show like counts
    },
    video: {
    type:String, 
    required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})


export default mongoose.model( 'short', shortsSchema )