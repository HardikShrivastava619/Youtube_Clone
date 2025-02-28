import express from 'express';
import { getVideoLikesController, getVideoViewsController, setCommentsController, setCommentsLikesAndDisLikeController, setDeleteCommentsController, setVideoLikesController, setVideoViewsController } from '../controller/commentController.js'
import { requireSignIn } from '../middelwares/userMiddlewares.js'

const router = express.Router();
  

router.post('/save_shorts_views/:vid/:uid' , requireSignIn , setVideoLikesController   )

router.get('/getVideoDetails/:vid'  , getVideoLikesController   )

router.post('/setVideoviwes/:vid'  , setVideoViewsController   )

router.get('/getVideoviwes/:vid'   ,  getVideoViewsController   )

router.post('/setComment/:vid/:uid'   ,  setCommentsController   )

router.post('/setComment_likes_disLikes/:cid/:commentTextId'   ,  setCommentsLikesAndDisLikeController   )

router.get('/deleteComment/:cid/:commnetTextId'   ,  setDeleteCommentsController   )



export default router