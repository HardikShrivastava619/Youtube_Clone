import path from 'path';
import videoModel from '../models/videoModel.js';
import fs from 'fs';
import mongoose from 'mongoose';

export const uploadVideoController = async (req, res) => {
  
  try {
    const {uid} = req.params;

    const channelName = new mongoose.Types.ObjectId(uid)

    const { videoUrl,title,description,madeForKids,tag,language,category,commentsstatus,allowViewRatings,selectedDate, location,} = req.body;
    
    const { videoFile , thumbnail  } = req.files;
    
    
if (  !title,!thumbnail,!category,!madeForKids,!description,!language,!tag,!category){
  return res.status(404).send({success:false, message:"some fields are missing" })
}
     let thumbnailPath = thumbnail[0].path
    
    if (videoFile) {
      let videoPath = videoFile[0].path 
 

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
          commentID : null 
        },
        allowViewRatings,
        video: videoPath, 
        channelName
      };






      const newVideo = await videoModel.create(videoData);

      return res.status(201).json({ message: 'Video uploaded successfully', video: videoData });
    }

    const videoData = {
      title,
      description,
      madeForKids,
      tags: tag ? tag.split(',') : [],
      language,
      thumbnail:thumbnailPath,
      recordingDetails: {
        recordedDate: selectedDate ? new Date(selectedDate) : null,
        location,
      },
      category,

      comments: {
        status: commentsstatus,
        commentID : null 
      },
      allowViewRatings,
      video: videoUrl,   
      channelName
      };

    const newVideo = await videoModel.create(videoData);

    return res.status(201).json({ message: 'Video uploaded successfully', video: videoData });
  } catch (error) {
    console.error('Error saving video data:', error);
    return res.status(500).json({ error: 'Error saving video data' });
  }
};


export const getvideosController = async (req,res)=>{
try {

const {category} = req.params

if (category === 'All') {
  const videos = await videoModel.find().populate('comments.commentID channelName', 'channel numberOfviews profilePicture').exec();



  return res.status(200).send({message:'videos are sent' , success:true,videos }  )
    
}else{

  const videos = await videoModel.find({category}).populate('comments.commentID channelName', 'channel numberOfviews profilePicture').exec();

      
     
 return res.status(200).send({message:'vid sent succesfully' ,  success:true  , videos }  )



}



}catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Errorin sending data' });
}}


export const getlargeVideoController =async (req,res) => {
  try {
    const {vid} = req.params;


    if (!vid) {
      return res.status(404).send({message:"Server error please try again"})
    }

const largePageVideo =  await videoModel.findOne({_id:vid}).populate("channelName", 'channel subscribers profilePicture').populate({ path : "comments.viewersComments" ,  select : ' channel ,text,timestamp,likes '}  ).exec();


if (!largePageVideo) {
  return res.status(404).send({message:"video is no more on youtube" , success:false })
}
return res.status(200).send({message:'video sent successfully', largePageVideo , success:true })
} catch (error) {

  return res.status(504).send({message:"Server error please try again"})
}}


export const getuploaded_vidController = async (req,res) => {
  try {

    const {uid} = req.params

    const videos =  await videoModel.find({channelName : uid })

if (videos.length === 0 ) {
  return res.status(200).send({message:" no video is uploaded by you " , success:true    })
  }

    return res.status(200).send({message:"videos are sent" , success:true  ,videos  })

  } catch (error) {
    console.log(error);
    return res.status(504).send({message:"Server error please try again"})
    
  }
}


; export const deleteSelectedVid = async (req, res) => { 
    
    try { 
      const { vid } = req.params;
      
 if (!vid) {
   return res.status(404).send({ message: "vid not sent" }); 
  } 
 const video = await videoModel.findOneAndDelete({ _id: vid });  
 if (!video) {
   return res.status(404).send({ message: "Video not found", success: false }); 
  } 
if (video.video){
   fs.unlink(path.resolve(video.video), (err) =>{ 
    if (err) { 
    console.error('Error deleting video file:', err);
   } }
  );
   } 
if (video?.thumbnail) {
   fs.unlink(path.resolve(video.thumbnail),
    (err) => { 
      if (err) { 
        console.error('Error deleting thumbnail file:', err); 
      } 
    }); 
    } return res.status(200).send({ message: "Video deleted successfully" }); 
  } catch (error) { 
    console.log(error);
     return res.status(504).send({ message: "Server error please try again" }); 
} };

