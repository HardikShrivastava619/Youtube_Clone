import { comparePassword, hashPassword } from "../helper/userHelper.js"
import jwt from 'jsonwebtoken'
import userModel from "../models/UserModel.js"
import { sendVerificationCode } from "../middelwares/Email.js"
import mongoose from "mongoose"
import videoModel from '../models/videoModel.js';
import commentsModel from "../models/CommentsModel.js"
import exp from "constants"


export const registerController = async (req,res)=>{
    try {
    const  {name,email,DOB,gender } = req.body
if(!name){return res.status(404).send({success:false , message:"name is required"})}
if(!email){return res.status(404).send({success:false , message:"email is required"})}
if(!DOB){return res.status(404).send({success:false , message:" please enter valid Date"})}
if(!gender){return res.status(404).send({success:false , message:" please enter gender"})}

const existingUser = await userModel.findOne({email}).select('+password')
if (existingUser) {
    if (existingUser.isVerified === false) {
        const verficationCode = Math.floor(100000 + Math.random()* 900000).toString()
        await userModel.findOneAndUpdate({email},{verficationCode})
        sendVerificationCode(email , verficationCode)
       return res.status(404).send({success:false , message:"email is already registered but  not verified" , existingUser  }  )
    }else if(existingUser.isVerified === true && !existingUser?.password  ){
        return res.status(404).send({success:false , message:"email is already registered and verified but you have not set your password ", existingUser  }  )
    }       return res.status(404).send({success:false , message:"email is taken" , existingUser  }  )
            
        
}

const verficationCode =Math.floor(100000 + Math.random()* 900000).toString()
const newUser = await userModel.create({name,email,DOB,verficationCode})
sendVerificationCode(newUser.email , verficationCode)

res.status(202).send({success:true , message:"Registration successfull" , newUser})
}catch (error) {
        console.log(error);
        res.status(505).send({success:false , message:" sorry server error in Registration " , error })
}}










export const loginController = async(req,res)=>{
    try {
        const { email } = req.params;
        const { password } = req.body;

        if (!email) {
            return res.status(404).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(404).json({ success: false, message: "Password is required" });
        }


        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }


        const match = await comparePassword(password, user?.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const cookieExpiration = new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRATION, 10));

        res.cookie("youtube", token, {
            expires: cookieExpiration,
            httpOnly: true,
        }).status(202).json({
            success: true,
            message: "Login Successful",
            user,
            token,
        });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(505).json({
            success: false,
            message: "Sorry, server error during login",
            error: error.message,
        });
    }
}




export const verifyController = async (req, res) => {
    try {
        const { code } = req.body;
        
        const {email} = req.params
        const user = await userModel.findOne({email});
        if (user) {
            if (user.verficationCode === code) {
                user.isVerified = true
                user.verficationCode =undefined 
                await user.save()
                return res.status(202).send({ success: true, message: "Your email is verified successfully" });
            }  if (user.verficationCode !== code) {
                return res.status(400).json({ success: false, message: "Invalid Code" });
            }
        }
  if (!user) {
    return res.status(500).send({message:"email is not registrered " , success:false })
  }             
 
      } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: error.message,
        });
    }
};



export const reSetPasswordController = async (req,res) => {
    try {
        
const {email} = req.params
const {password} = req.body

if (password.length < 6 ) {
    return res.status(400).send({message : 'please enter 6 digit password' , succcess:false , })     
    }
    
    const hashedPassword = await  hashPassword(password)        
    const user = await userModel.findOneAndUpdate({email} , { password:hashedPassword} )

res.status(200).send({message:"password set successfully" , success:true , user })
} catch (error) {
        console.log(error);
        res.status(505).send({success:false , message:"server error " , error })
    }
}



export const registerPasswordController  = async (req,res) => {
   try {
        const {email} = req.params
        const {password} = req.body


        
if (password.length < 6 ) {
return res.status(400).send({message : 'please enter 6 digit password' , succcess:false , })     
}


        const hashedPassword = await  hashPassword(password)        
        const user = await userModel.findOneAndUpdate({email} , { password:hashedPassword} )

if (!user){
return    res.status(404).send({message:"user not found", success:false })
}
      return res.status(202).send({   message:"password set Successfully" ,success:true, }  )            

    } catch (error) {
        console.log(error)
        return res.status(504).send({   message:"server error in setting password " ,success:false, }  )            
    }
}

export const updateUserController = async (req, res) => {
try {
const {name, email , Description,channel , DOB} = req.body  
const {uid,token} = req.params
const {profilePicture} = req.files
const id = new mongoose.Types.ObjectId(uid)
if (profilePicture) {
    const userProfilePic = profilePicture[0]?.path
    
    const existingUseruser =  await userModel.findOne( {_id: uid})
    const user = await userModel.findOneAndUpdate({_id: id},{
    name : name || existingUseruser.name,
    email :email || existingUseruser.email,
    Description:Description || existingUseruser.Description,
    DOB : DOB || existingUseruser.DOB,
    profilePicture : userProfilePic || existingUseruser.profilePicture,
    channel: channel || existingUseruser.channel
    } , {new:true})
    
return res.status(200).send({message:"profile updated successfully", success:true , user,token  })
    }


const existingUseruser =  await userModel.findOne( {_id: uid})
const user = await userModel.findOneAndUpdate({_id: uid},{
name : name || existingUseruser.name,
email :email || existingUseruser.email,
Description:Description || existingUseruser.Description,
DOB : DOB || existingUseruser.DOB,
channel: channel || existingUseruser.channel
} , {new:true})

return res.status(200).send({message:"profile updated successfully", success:true , user,token  })
    
} catch (error) {
    console.log(error);
    return res.status(504).send({ message: 'Server error in updating profile ', success: false,error });
    
}

};


export const getSearchedVideoController = async (req,res) => {
    try {
        const {key} = req.params
if (!key || key.trim() === ""){
    return res.status(400).send({ success: false, result: [] });
}

const result = await videoModel.find({
    $or:[
        {title:{$regex:key , $options : 'i'}  },
        {description:{$regex:key , $options : 'i'}  },
        {category:{$regex:key , $options : 'i'}  }
    ]
}).populate('channelName comments.commentID'  ,   'profilePicture channel numberOfviews' )
res.status(200).send({message:'result send successfully' , succcess:true , result })

    } catch (error) {
        console.log(error);
          return res.status(504).send({ message: 'Server error  ', success: false });
  
    }
}
  

export const getuserProfilePicController = async (req,res) => {
    try { 
        const {email}  =  req.params
        const user = await userModel.findOne({email})

        res.status(200).send({success:true , message:"photo send successfully" , user } )

    } catch (error) {
        console.log(error);
        return res.status(504).send({ message: 'Server error in getting profile photo', success: false });
        
    }
}


export const getChannelNameController = async () => {
    try {
        
const  {uid}  = req.params 
const id = new mongoose.Types.ObjectId(uid) 
const user = await userModel.findOne({_id : uid })
return res.status(200).send({success:true , message:"user found successfully" , user } )
} catch (error) {
console.log(error);
return res.status(504).send({ message: 'Server error in getting Channel', success: false });
}}



export const setVideoHistoryController = async (req, res) => {
    try {
        const { vid } = req.body;
        const { uid } = req.params;
        const videoID = new mongoose.Types.ObjectId(vid);

        const user = await userModel.findOne({ _id: uid });
        if (!user){
            return res.status(404).json({ message: "User not found", success: false });
        }
        const videoIndex = user.history.videoHistory.findIndex( (v) => v.toString() === videoID.toString());
        if (videoIndex !== -1){
            user.history.videoHistory.splice(videoIndex, 1);
        }
        user.history.videoHistory.unshift(videoID);
        await user.save();
        return res.status(200).json({ message: 'Video saved in history', success: true, history: user.history });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false, error });
}};

export const getVideoHistoryController = async (req,res) => {
    try {

const {uid} = req.params

        const user  = await userModel.findOne({_id:uid}).populate({ path : 'history.videoHistory', 
select :   ' description  channelName   thumbnail',
populate:{
path : "channelName",
select:"channel"
},



        }    )
if (!user) {
    return res.status(404).send({message:'user not found' , success:false   })
}
return res.status(200).send({message:'history videos', success:true ,user })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false, error });

    }
}




export const setDletedVideoHistController = async (req,res) => {
    try {
    const {uid} = req.params
    const {vid} = req.body
    const videoID = new mongoose.Types.ObjectId(vid)
    const user = await userModel.findOne({_id:uid})
    const videoIdx =    user?.history?.videoHistory?.findIndex((i)=> i.toString() === videoID.toString())
    user?.history?.videoHistory?.splice( videoIdx , 1)

await user?.save()

    return res.status(200).send({
    message:'video Deleted SSuccessfully',
    success:true,
    user
    })
    }catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false, error });
 
    }}



export const setDletedShortHistController  = async (req,res) => {
    try {
        const {uid} = req.params
        const {sid} = req.body
        const shortID = new mongoose.Types.ObjectId(sid)
        const user = await userModel.findOne({_id:uid})
        const shortIdx =  user?.history?.shorts_history?.findIndex((i)=> i.toString() === shortID.toString())
        user?.history?.shorts_history?.splice( shortIdx , 1)
    
    await user?.save()
    
        return res.status(200).send({
        message:'short Deleted SSuccessfully',
        success:true,
        user
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false, error });
        
    }
}






  export const setShortHistoryController = async (req, res) => {
    try {
        const { sid } = req.body;
        const { uid } = req.params;
        const shortID = new mongoose.Types.ObjectId(sid);

        const user = await userModel.findOne({ _id: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const videoIndex = user.history.shorts_history.findIndex( (v) => v.toString() === shortID.toString());
        if (videoIndex !== -1){
            user.history.shorts_history.splice(videoIndex, 1);
        }

        user.history.shorts_history.unshift(shortID);

        await user.save();
        
        return res.status(200).json({ message: 'Video saved in history', success: true, history: user.history });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false, error });
    }
};





export const getShortHistoryController = async (req,res) => {
    try {

const {uid} = req.params
const user  = await userModel.findOne({_id:uid}).populate({ path : 'history.shorts_history', 
select :   ' description  channelName   thumbnail',
populate:{
path : "channelName",
select:"channel"
},
        }    )
if (!user) {
    return res.status(404).send({message:'user not found' , success:false   })
}
return res.status(200).send({message:'history videos', success:true ,user })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false, error });

    }
}




export const removeHistoryController = async (req,res) => {
    try {
const {uid} = req.params

const user = await userModel.findOneAndUpdate({_id:uid}, {history:{
    videoHistory:[],
    shorts_history:[]

}} ,{new:true}  )
return res.status(200).send({message:"Your watch history is removed ",success:true , user })    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false, error });
}}

export const createPlaylistController = async (req, res) => {
    try {
        const { name, privacy } = req.body;
        const { uid } = req.params;

        if (!name) {
            return res.status(400).send({ message: "Name is required", success: false });
        }

        const user = await userModel.findOne({ _id: uid });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const exiStingPlayList = user.playlists.findIndex((p) => p.name === name);
        if (exiStingPlayList !== -1) {
            return res.status(400).json({ message: "Playlist of this name is already created", success: false });
        }

        // Add the new playlist
        user.playlists.unshift({ name: name, privacy: privacy });
        await user.save(); // Save changes to the database

        return res.status(200).send({ message: "Playlist is created", success: true });
    } catch (error) {
        console.error(error); // Log error on the server
        return res.status(500).json({ message: "Server error", success: false, error });
    }
};


export const getPlaylistController = async (req,res) => {
    try {
const {uid} = req.params
const playlist = await userModel.findOne({_id:uid}).select('playlists').populate({path:"playlists.videos" ,  select:"thumbnail title"})

return res.status(200).send({success:"true" , playlist})
} catch (error) {
console.log(error);
return res.status(500).json({ message: "Server error", success: false, error });
}}


export const saveVidInPlaylistController = async (req,res) => {
    try {
const {uid} = req.params
const {vid , playListName} = req.body

const videoId = new mongoose.Types.ObjectId(vid)

const user = await userModel.findOne({_id:uid})

const index =  user.playlists.findIndex((p)=> p.name  === playListName )
const isVideoInPlayList =  user.playlists[index]?.videos?.findIndex((v)=> v.toString() === videoId.toString() )


if (isVideoInPlayList !==  -1 ) {
    return res.status(404).send({message:"video already in this playList", success:false  }  )
}
user.playlists[index]?.videos.unshift(videoId)

await user.save()

return res.status(200).send({ success:true })
}catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false, error });
    }
}

export const largeVidPlaylistController = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    const user = await userModel.findOne(
      { _id: uid, 'playlists._id': pid },
      { 'playlists.$': 1 }
    ).populate();

    if (!user || user.playlists.length === 0) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const selectedPlaylist = user.playlists[0]; 
    const firstVideoId = selectedPlaylist.videos[0]; 

    if (!firstVideoId) {
      return res.status(404).json({ message: 'No videos found in the selected playlist' });
    }

    const videoDetails = await videoModel.findById(firstVideoId).populate('channelName' , 'channel profilePicture') 

if (!videoDetails) {
return    res.status(404).json({message:'not found' , success:'false' })
}



    return res.status(200).json({
      message: 'First video retrieved successfully',
      video: videoDetails,
    playList : selectedPlaylist
    });
  } catch (error) {
    console.error('Error fetching first video of playlist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const otherVidPlaylistController = async (req, res) => {
    try {
const { uid, pid } = req.params;
const user = await userModel.findOne({ _id: uid, 'playlists._id': pid },{ 'playlists.$': 1 }).populate({path : 'playlists.videos',select:'title description channelName thumbnail',populate:{path:'channelName',select:'channel'}})

return res.status(200).send({message:"ply succesfull" , success:true  , user})
}catch(error){
        console.error("Error fetching playlist:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

export const findUserController = async (req,res)=>{
    try {
        const {uid} = req.params
        const user = await userModel.findById(uid)


        return res.status(200).send({message:'user sent successfully' , user , success:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
       
    }
}


export const deletePlayListController = async (req,res) => {
    try {
 const {pid} = req.params
 const {uid} = req.body

const user = await userModel.findById(uid)

user.playlists =  user.playlists.filter((p)=> p._id.toString() !==  pid.toString()    )

await user.save()
return res.status(200).send({message:"playList deleted succesfuuly", success:true , user  })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
}


export const subscribeChannelController = async (req,res) => {
    try {
const {uid , cid} = req.params

if (!uid,!cid) {
    return res.status(404).send({message:" uid and cid are not sent ", success:false })
}
const user = await userModel.findById(uid)

const alreaySubscribed = user.subscribedToChannels.includes(cid)
if (alreaySubscribed){
 user.subscribedToChannels =    user.subscribedToChannels.filter((i)=>  i.toString() !== cid.toString() )
 await user.save()
return res.status(200).send({message:"channel UnSubscribed" , success:true  })
}
user.subscribedToChannels.push(cid)
await user.save()

return res.status(200).send({ message:"channel Subscribed" , success:true })


} catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
       
    }
}


export const getSubscribeChannelController = async (req,res) => {
    try {
        
     const {uid} = req.params

const subscribeChannels = await userModel.findById(uid).select('subscribedToChannels').populate([{ path: 'subscribedToChannels', select: 'channel profilePicture uploadedVideos',   populate:{path : 'uploadedVideos' , select:'description createdAt thumbnail title comments',
    populate: {path : 'comments.commentID' , select:'numberOfviews',
    }}}])
     return res.status(200).send({message:"subscribed channels are sent " , success:true , subscribeChannels  })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    
    }
}




export const updateuploaded_vidController = async (req,res) => {
    try {
        const {uid} = req.params

        const videos = await videoModel.find({channelName : uid }).select('_id')

        const upVid = videos.map(id => new mongoose.Types.ObjectId(id));

const user = await userModel.findOneAndUpdate({_id : uid },{ uploadedVideos : upVid } ,{new:true} )
return res.status(200).send({message:'videos saved ' , success :true ,user  })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    
    }
}


export const watchLater_vidController = async (req,res) => {
    try {
      
const {uid , vid} = req.params

const video = new mongoose.Types.ObjectId(vid)

const user = await userModel.findOne({_id : uid  })  

if (user?.WatchLater?.videos?.includes(video)) {

    const index  =  user?.WatchLater?.videos?.findIndex((id)=>  id.toString() === vid  )
    
    user?.WatchLater?.videos?.splice(index , 1 )
    await user.save()
  
    return res.status(200).send({message:'removed from  watchlater' , success:true })
}
user.WatchLater?.videos?.unshift(video)

await user.save()

return res.status(200).send({message:'video saved to watch Later' , success:true , user  }  )

} catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    
    }
}

export const get_watchLater_vidController = async (req,res) => {
    try {
        const {uid} = req.params 

        const user = await userModel.findOne({_id : uid}).select('WatchLater').populate([{ path : 'WatchLater.videos', select:'_id title description  video createdAt tags channelName' , populate:{path:'channelName' , select:'channel'   }  }  ]  )

    return res.status(200).send({message:'watchlater send succesfully ' , success :true, user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
}

export const getWatchLaterVidController = async (req,res) => {
    try {
const {uid} = req.params;
const getWatchLater = await userModel.findOne({_id : uid }).select('WatchLater').populate( [ { path:'WatchLater.videos' , select:' thumbnail title createdAt comments channelName description video ' , populate:{ path : 'comments.commentID  channelName' , select:" numberOfviews channel profilePicture" ,
}}]).populate([{path:'WatchLater.shorts' , select:' thumbnail title createAt comments channelName description video ' , populate:{ path : 'comments.commentID  channelName' , select:" numberOfviews channel profilePicture" ,
    }}])

    

return res.status(200).send({message:'videos are sent successfully' , success:true ,  getWatchLater})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
        
    }
}

export const saveShortinWatchLaterController = async (req,res) => {
    try {
        const {uid,sid} = req.params
    
const shortId = new mongoose.Types.ObjectId(sid)
    
        const user = await userModel.findOne({_id:uid})

const shortIndx =    user?.WatchLater?.shorts?.findIndex(s=>s.toString()=== sid  )
if (shortIndx !== -1  ){
   user?.WatchLater?.shorts?.splice(shortIndx ,1)
 await user.save()









 return res.status(200).send({message:'short removed from watchLater', success :true , user })
}else{
user?.WatchLater?.shorts?.unshift(shortId)
await user.save()
return res.status(200).send({message:'short saved to watchLater', success :true , user })
}} catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
       
    }
}

export const get_Liked_vid_Controller = async (req,res) => {
    try {
       const {uid} = req.params 

const userLikedVid = await userModel.findOne({_id:uid}).select('likedVideos').populate([{path:"likedVideos" , select:'title channelName thumbnail comments  createdAt' , populate:{path:'channelName comments.commentID',select:'channel numberOfviews ' } ,    }])

return res.status(200).send({message:'liked videos sent succesfully', success:'true' , userLikedVid  }) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
       
    }
}

export const setLikedVideosController = async (req,res) => {
    try {
const {vid,uid} = req.params
const videoId = new mongoose.Types.ObjectId(vid)

const user = await userModel.findOne({_id : uid})    



user?.likedVideos?.unshift(videoId)

await user.save()

return res.status(200).send({message:"videoSaved in Liked Videos successfully" , success:true, user })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
        
    }
}


export const removeLikedVideosController = async (req,res) => {
    try {
        const {vid,uid} = req.params
        const videoId = new mongoose.Types.ObjectId(vid)
        
        const user = await userModel.findOne({_id : uid})    
        
        const vidIndx = user?.likedVideos?.findIndex(v =>  v.toString() === videoId.toString() )
 if (vidIndx !== -1 ) {
    user?.likedVideos?.splice(vidIndx , 1)
}
    
await user.save()
 

        
        
        return res.status(200).send({message:"video is reomved from Liked Videos successfully" , success:true, user })
        
            } catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
                
            }
        } 


        export const downloadVideosController = async (req,res) => {
            try {
              const {uid,vid} = req.params
              
const vidId = new mongoose.Types.ObjectId(vid)

              const user = await userModel.findOne({_id:uid}).select('Downloads')

              user?.Downloads?.unshift(vidId) 
              
              await user.save()
return res.status(200).send({message:'Download Successfull', success: true ,user  })
            } catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
              
            }
        }


        export const downloadedVideosController = async (req,res) => {
            try {
                const {uid} = req.params
                const user= await userModel.findOne({_id:uid}).select('Downloads')
                return res.status(200).send({
    message:'vides sent',
    success:true,
user
})
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
              
            }
        }



        export const deleteDownloadVideosController = async (req,res) => {
            try {
                const {uid , vid } = req.params
const user = await userModel.findOne({_id:uid}).select('Downloads')

const indx = user?.Downloads.findIndex(v=> v.toString() === vid )

user?.Downloads?.splice(indx,1 )

await user.save()


return res.status(200).send({message:'Video Deleted Successfully' ,   success:true ,user  })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
              
                
            }
        }


         export const getDownloaddedVideosControoler = async (req,res) => {
            try {
                const {uid} = req.params 

const user = await userModel.findOne({_id:uid}).select('Downloads').populate( {path:'Downloads' , select:"title createdAt comments thumbnail channelName" , populate:{path:'comments.commentID channelName' , select:'numberOfviews channel'  }  } )


return res.status(200).send({message:'downloaded videos sent succesfuuly' ,  succcess:true , user })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
            
            }
        }


        export const  getDownloadedVidlargeController  = async (req,res) => {
            try {
                const {uid,vid} = req.params
                const userInfo = await userModel.findById(uid).select('Downloads').populate( {path:'Downloads',select: 'title thumbnail video  ' , populate:{path:'channelName',select:'channel profilePicture '   } })
                return res.status(200).send({message:'Downloaded videos are sent succesfully' , succes:true, userInfo })



            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
            
                
            }
        }



        export const getuserSubscribedController = async (req,res) => {
            try {
                const {uid} = req.params 

                
                const usersSubscribedarray = await userModel.findOne({_id:uid}).select('subscribedToChannels')
                return res.status(200).send({message:'usersSubscribedarray send successfull' , success:true , usersSubscribedarray  })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message,
                });
            
            }
        }