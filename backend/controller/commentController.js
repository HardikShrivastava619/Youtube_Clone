import mongoose from "mongoose"
import commentsModel from "../models/CommentsModel.js"
import videoModal from '../models/videoModel.js'
import shortModel from "../models/shortModel.js";
import CommentsModel from "../models/CommentsModel.js";

export const setVideoLikesController = async (req, res) => {
  try {
      const { likes, disLikes } = req.body;
      const { vid, uid } = req.params;

      if (!vid || !uid) {
          return res.status(400).send({ message: "Missing video or user ID", success: false });
      }

      const video = new mongoose.Types.ObjectId(vid);

      const videoDetails = await commentsModel.findOneAndUpdate(
          { video },
          { $set: { likes, disLikes } },
          { upsert: true, new: true }
      );

      if (!videoDetails) {
          return res.status(404).send({ message: "Comment not found", success: false });
      }

      const videoData = await videoModal.findById(vid);
      if (videoData) {
          videoData.comments.commentID = videoDetails._id;
          await videoData.save();
      }

      const shortData = await shortModel.findById(vid);
      if (shortData) {
          shortData.comments.commentID = videoDetails._id;
          await shortData.save();
      }

      res.status(200).send({ message: "Details saved successfully", success: true, videoDetails });
  } catch (error) {
      console.error("Error updating likes/dislikes:", error);
      res.status(500).send({ message: "Server error", success: false });
  }
};


export const getVideoLikesController  = async (req,res) => {
    try {
const {vid} =  req.params
const videoId = new mongoose.Types.ObjectId(vid);

const videoDetails = await commentsModel.findOne({video: videoId}).populate('commentText.user' , 'profilePicture  channel ' )

return res.status(200).send({message:"vidos got successfully " , success:true  , videoDetails})
    } catch (error) {
        console.log(error);
        
    }
}



export const setVideoViewsController = async (req,res) => {
  try{


const {vid} =  req.params
const {uid} =  req.body

const videoId = new mongoose.Types.ObjectId(vid);


const video = await commentsModel.findOne({video:videoId})

if (!video) {
  return res.status(504).send({message:" comment modal not found   " , success:false })
}


video.numberOfviews.push(uid)

await video.save()


return res.status(200).send({message:" no. of views are updated" , success:true })

  }catch (error) {
    console.log(error);
    return res.status(504).send({message:"server Error "  , success:false })
  }
}


export const getVideoViewsController = async (req,res) => {
  try {

    const {vid}  = req.params
if (!vid) {
  return res.status(404).send({message:"vid not found" , success:false , views} )
  
}
const videoId = new mongoose.Types.ObjectId(vid)

    const views = await commentsModel.findOne( {video : videoId})
if (!views) {
  return res.status(404).send({message:"views are not found" , success:false , views} )
  
}

return res.status(200).send({message:"views are sent" , success:true , views} )

  } catch (error) {
    console.log(error);
    return res.status(504).send({message:"server Error "  , success:false })
    
  }
}


export const setCommentsController = async (req,res) => {
  try {
    const {vid, uid} =  req.params;
    const {commentText} = req.body

const uidId = new mongoose.Types.ObjectId(uid)

console.log(uidId);



const comment=  await commentsModel.findOne({video : vid  } )

comment.commentText.unshift({ user:uidId, text:commentText  })

await comment.save()


  return res.status(200).send({message:'comment successfull ' , success:true , comment })

  } catch (error) {
    console.log(error);
    return res.status(504).send({message:"server Error "  , success:false,error })
    
  }
}

export const setCommentsLikesAndDisLikeController = async (req,res) => {
  try{
const {cid,commentTextId}  = req.params
const {updatedLikes , updatedDisLikes} = req.body

const comment = await commentsModel.findOne({_id : cid})


 const likedComment_of_user =  comment.commentText.find((c)=>  c?._id.toString() === commentTextId )

 likedComment_of_user.commentLikes = updatedLikes

 likedComment_of_user.commentDisLikes = updatedDisLikes

await comment.save()

return res.status(200).send({success:true , message:"comments updated Succesfully"  })

} catch (error) {
    console.log(error);
    return res.status(504).send({message:"server Error "  , success:false,error })
      
  }
}

export const setDeleteCommentsController = async (req,res) => {
  try {
    const { cid,commnetTextId } =req.params 
   
    const comment = await CommentsModel.findOne({_id:cid})

const index =     comment.commentText.findIndex((o=> o._id.toString() === commnetTextId ))

comment?.commentText?.splice(index , 1 )

await comment.save()

return res.status(200).send({message:"comment deleted successfully" , success:true  }  )
} catch (error) {
    console.log(error);
    return res.status(504).send({message:"server Error "  , success:false,error })
    
  }
}