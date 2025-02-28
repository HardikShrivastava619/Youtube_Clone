
import express from 'express'
import { getuserProfilePicController, loginController, updateUserController, registerController, registerPasswordController,  verifyController, setVideoHistoryController, getVideoHistoryController, removeHistoryController, createPlaylistController, getPlaylistController, saveVidInPlaylistController, largeVidPlaylistController, otherVidPlaylistController, findUserController, deletePlayListController, subscribeChannelController, getSubscribeChannelController, updateuploaded_vidController, watchLater_vidController, get_watchLater_vidController, getWatchLaterVidController, setShortHistoryController, setDletedVideoHistController, getShortHistoryController, setDletedShortHistController, saveShortinWatchLaterController, get_Liked_vid_Controller, setLikedVideosController, removeLikedVideosController, downloadVideosController, downloadedVideosController, deleteDownloadVideosController, getDownloaddedVideosControoler, getDownloadedVidlargeController, getuserSubscribedController, getSearchedVideoController, reSetPasswordController} from '../controller/userController.js'
import multer from 'multer'
import fs from 'fs';
import path from 'path';
import { requireSignIn } from '../middelwares/userMiddlewares.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
if (!fs.existsSync("../client/public/upload")  ) {
 fs.mkdirSync("../client/public/upload")
 }
 if (!fs.existsSync("../client/public/upload/profilePhotos") ) {
 fs.mkdirSync("../client/public/upload/profilePhotos")
 }
 
 cb(null, '../client/public/upload/profilePhotos')
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname  )
    }
  })
  
 
const upload = multer({
storage:storage,fileFilter:function (req,file,cb) {
var ext = path.extname(file.originalname)
if (file.fieldname === 'profilePicture'){
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
    return cb (new Error("only images are allowed") )
    }
    cb(null,true)
    }}
})
 










const router = express.Router()


router.post("/register" , registerController )

router.post("/register_password/:email" , registerPasswordController )

router.put("/reset_password/:email" , reSetPasswordController )


router.post("/login/:email" , loginController )

router.post("/verify/:email" , verifyController )

router.post("/updateprofile/:uid/:token"  ,  requireSignIn,upload.fields([{name:"profilePicture", maxCount:1 }])  , updateUserController )


router.get("/getUserprofilePhoto/:email"    , getuserProfilePicController )
router.get("/getUserSubscibedChannels/:uid"    , getuserSubscribedController )

router.post('/setVideoHistory/:uid', setVideoHistoryController    )

router.put('/setDletedVideoHist/:uid', setDletedVideoHistController    )

router.put('/setDletedShortHist/:uid', setDletedShortHistController    )

router.get('/getVideoHistory/:uid', getVideoHistoryController    )

router.post('/setShortHistory/:uid', setShortHistoryController    )

router.get('/getShortHistory/:uid', getShortHistoryController    )

router.post('/removeHistory/:uid', removeHistoryController    )

router.post("/create_playList/:uid",  createPlaylistController )

router.get("/get_playList/:uid",  getPlaylistController )

router.post("/save_vid_in_playList/:uid",  saveVidInPlaylistController )

router.get("/playList_large_vid/:uid/:pid",  largeVidPlaylistController )
















router.get("/playList_other_videos/:uid/:pid",  otherVidPlaylistController )

router.get('/find_user/:uid' ,  findUserController  )

router.post('/deletePlayList/:pid' ,  deletePlayListController  )

router.post('/subscribed_channel/:uid/:cid' ,  subscribeChannelController  )

router.get('/get_subscribed_channels/:uid' ,  getSubscribeChannelController  )

router.put('/updateuploaded_videos/:uid', updateuploaded_vidController);

router.put('/send_vid_for_watchLater/:uid/:vid', watchLater_vidController);

router.get('/get_vid_for_watchLater/:uid/', get_watchLater_vidController);

router.get('/get_WatchLater_vid/:uid' , getWatchLaterVidController  )

router.put('/save_WatchLater_short/:uid/:sid' , saveShortinWatchLaterController  )



router.get('/get_likedVideos/:uid' , get_Liked_vid_Controller  )

router.put('/set_likedVid/:uid/:vid' ,  setLikedVideosController )

router.put('/remove_video_likedVid/:uid/:vid' ,  removeLikedVideosController )

router.put('/download_video/:uid/:vid' ,  downloadVideosController )


router.put('/deleteDownload_video/:uid/:vid' ,  deleteDownloadVideosController )

router.get('/get_download_video/:uid' ,  downloadedVideosController )

router.get('/getDownloadedVid/:uid'  ,  getDownloaddedVideosControoler)

router.get('/getDownloadedVidlarge/:uid/:vid'  ,  getDownloadedVidlargeController)

router.get('/getSearchedVid/:key'  ,  getSearchedVideoController)



export default router