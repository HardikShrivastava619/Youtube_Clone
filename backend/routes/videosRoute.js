import express from 'express';
import { deleteSelectedVid, getlargeVideoController, getuploaded_vidController, getvideosController, uploadVideoController } from '../controller/videoController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';


  const storage = multer.diskStorage({

  destination:function (req,file,cb) {
   
 if (file.mimetype === 'video/mp4' ||file.mimetype === 'video/x-matroska'   ) {
 if (!fs.existsSync("../client/public/upload")  ) {
 fs.mkdirSync("../client/public/upload")
}
 if (!fs.existsSync("../client/public/upload/videos") ) {
 fs.mkdirSync("../client/public/upload/videos")
}
 cb(null,'../client/public/upload/videos')
}else if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/png'   ) {
 if (!fs.existsSync("../client/public/upload")  ) {
 fs.mkdirSync("../client/public/upload")
}
 if (!fs.existsSync("../client/public/upload/thumbnail") ) {
 fs.mkdirSync("../client/public/upload/thumbnail")
}
  cb(null,'../client/public/upload/thumbnail')
}},
  filename:function (req,file,cb) {
    cb(null, Date.now() + file.originalname  )
  }
})


const upload = multer({
storage:storage,fileFilter:function (req,file,cb) {
var ext = path.extname(file.originalname)
if (file.fieldname === 'videoFile' ) {
if (ext !== '.mkv' && ext !== '.mp4' ) {
return cb (new Error("only videos are allowed") )
}
cb(null,true)
}else if (file.fieldname === 'thumbnail'){
if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
return cb (new Error("only thumbnails are allowed") )
}
cb(null,true)
}}
})
 





const cpUpload =upload.fields([{name:'videoFile' ,   maxCount:1 },{ name : 'thumbnail' ,maxCount:1  }])


const router = express.Router();










router.post('/uploadVideo/:uid',cpUpload, uploadVideoController);

router.get('/getVideos/:category', getvideosController);

router.get('/getVideo_for_largeVideo/:vid', getlargeVideoController );

router.get('/getuploaded_vid/:uid', getuploaded_vidController);

router.delete('/delete_selected_vid/:vid' , deleteSelectedVid )




export default router;









