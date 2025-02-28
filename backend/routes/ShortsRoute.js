import express from 'express'
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { deleteSelectedshort, getAllshorts, getuploadedShorts_vidController,  saveShortsViewsController,  uploadShortsController } from '../controller/shortsController.js';


const storage = multer.diskStorage({

destination:function (req,file,cb) {
   
 if (file.mimetype === 'video/mp4' ||file.mimetype === 'video/x-matroska'   ) {
 if (!fs.existsSync("../client/public/upload")  ) {
 fs.mkdirSync("../client/public/upload")
}
 if (!fs.existsSync("../client/public/upload/shorts") ) {
 fs.mkdirSync("../client/public/upload/shorts")
}
 cb(null,'../client/public/upload/shorts')
}else if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/png'   ) {
 if (!fs.existsSync("../client/public/upload")  ) {
 fs.mkdirSync("../client/public/upload")
}
 if (!fs.existsSync("../client/public/upload/shortsthumbnail") ) {
 fs.mkdirSync("../client/public/upload/shortsthumbnail")
}
  cb(null,'../client/public/upload/shortsthumbnail')
}},
  filename:function (req,file,cb) {
    cb(null, Date.now() + file.originalname  )
  }
})


const upload = multer({
storage:storage,fileFilter:function (req,file,cb) {
var ext = path.extname(file.originalname)
if (file.fieldname === 'shortFile' ) {
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
 





const cpUpload =upload.fields([{name:'shortFile' ,   maxCount:1 },{ name : 'thumbnail' ,maxCount:1  }])







const router = express.Router()


router.post("/upload_shorts/:uid" ,cpUpload, uploadShortsController )

router.get('/getuploadedShorts_sid/:uid', getuploadedShorts_vidController);

router.delete('/delete_selected_short/:sid' , deleteSelectedshort )

 router.get('/get_all_shorts', getAllshorts )


router.put('/save_shorts_views/:uid/:sid' , saveShortsViewsController )

export default router;