import mongoose from "mongoose";
import shortModel from '../models/shortModel.js'
import fs from 'fs'
import path from 'path';
import CommentsModel from "../models/CommentsModel.js";
import userModel from "../models/UserModel.js"




export const uploadShortsController = async (req,res) => {
  try {
    const {uid} = req.params;



    const channelName = new mongoose.Types.ObjectId(uid)

    const { shortUrl,title,description,madeForKids,tag,language,category,commentsstatus,allowViewRatings,selectedDate, location,} = req.body;
    
    const { shortFile , thumbnail  } = req.files;
    

    
    
if (  !title,!thumbnail,!category,!madeForKids) {
  return res.status(404).send({success:false, message:"Please provide all necesarry fields" })
}
  

    let thumbnailPath = thumbnail[0].path
    
    if (shortFile) {
      let videoPath = shortFile[0].path 
 

    const videoData = {
        title,
        description,
        madeForKids,
        tags: tag ? tag.split(',') : [],
        language,
        recordingDetails: {
          recordedDate: selectedDate ? new Date(selectedDate) : null,
          location,
        },
        thumbnail:thumbnailPath,
        category,
        comments: {
          status: commentsstatus,
          commentID : null        },
        allowViewRatings,
        video: videoPath, 
        channelName
      };




      const newVideo = await shortModel.create(videoData);

      return res.status(201).json({ message: 'Video uploaded successfully', video: videoData });
    }

    const videoData = {
      title,
      description,
      madeForKids,
      tags: tag ? tag.split(',') : [],
      language,thumbnail:thumbnailPath,
      recordingDetails: {
        recordedDate: selectedDate ? new Date(selectedDate) : null,
        location,
      },
      category,

      comments: {
        status: commentsstatus,
      },
      allowViewRatings,
      video: shortUrl,   
      channelName
      };

    const newVideo = await shortModel.create(videoData);

    return res.status(201).json({ message: 'Shorts are uploaded successfully', video: videoData });
  } catch (error) {
    console.error('Error saving video data:', error);
    return res.status(500).json({ error: 'Error saving video data' });
  }
}




export const getuploadedShorts_vidController = async (req,res) => {
  try {
    const {uid} = req.params;

    const userOBJID = new mongoose.Types.ObjectId(uid)

    
    const shorts = await shortModel.find( {channelName : userOBJID} )


    if (!shorts) {
      return res.status(404).send({message:"no shorts are uploaded on this channel " , success:false })
      
    }

    return res.status(200).send({message:"shorts are sent" , success:true , shorts })

  } catch (error) {
    console.log(error);
    return res.status(500).send({message:"server error try again later" , success:false })
  }
}




export const deleteSelectedshort = async (req,res) => {
  try {

    const {sid} = req.params
    const short = await shortModel.findByIdAndDelete(sid)

if (!short){
return res.status(404).send({message:"short not found", success:false  })
}

if (short.video){
   fs.unlink(path.resolve(short.video), (err) =>{ 
    if (err) { 
    console.error('Error deleting video file:', err);
   } }
  );
   } 
if (short.thumbnail) {
   fs.unlink(path.resolve(short.thumbnail),
    (err) => { 
      if (err) { 
        console.error('Error deleting thumbnail file:', err); 
      } 
    }); 
    }


return res.status(200).send({message:"short Deleted succesfully"  , success:true })

}catch (error) {
    console.log(error);
    return res.status(500).send({message:"server error try again later" , success:false })
}}


export const getAllshorts = async (req,res) => {
  try {
    
const shorts = await shortModel.find().populate('channelName', ' _id profilePicture channel subscribedToChannels'  ).populate('comments.commentID' , ' likes disLikes numberOfviews ' )
if (!shorts) {
  return res.status(404).send({message:'no short is uploaded from any channel ', success:false })
  
}

return res.status(200).send({message:'shorts are sent ', success:true ,shorts})

  } catch (error) {
    console.log(error);
    return res.status(500).send({message:"server error try again later" , success:false })
    
  }
}


export const saveShortsViewsController = async (req,res) => {
  try {
    const { uid,sid } = req.params
   
  
  
const shortId =  new mongoose.Types.ObjectId(sid)

const shortComments = await CommentsModel.findOne({video:shortId})

shortComments?.numberOfviews?.unshift(uid)


await shortComments?.save()

   





return res.status(200).send({
  message:'views Uploaded Succesfully',
  success:true,
  shortComments 
})
} catch (error) {
    console.log(error);
    return res.status(500).send({message:"server error try  again later" , success:false,error })
    
  }
}