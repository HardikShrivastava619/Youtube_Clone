import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';


export function VideoPageJS() {
    const [otherVideos , setOtherVideos] = useState([])
    const [video,setVideo] = useState()
    const [videoDetails, setvideoDetails] = useState();
    const [likes,setLikes] = useState(  videoDetails?.likes || []  )
    const [disLikes,setDisLikes] = useState(videoDetails?.disLikes || [] )
    const [likeDone , setLikeDone] = useState()
    const [dislikeDone , setDisLikesDone] = useState()
    const [views,setViews] = useState()
    const [showModal,setShowModal] = useState(false)
    const [playlistOn, setPlaylistOn]= useState(false)
    const nameRef = useRef()
    const [privacy , setPrivacy ] = useState()
    const [dataMsg , setDataMSG] = useState()
    const [existingPlayList,setExistingPlayList] = useState()
    const [playListName,setplayListName] = useState()
    const [subscribed , setSubscribe] = useState()
    const [subscribedArray  ,  setSubscribedArray ] = useState([])
    const [download  ,  setDownload ] = useState(false)
    const [downloadStarted  ,  setDownloadtoStart ] = useState(false)
     const [downloadedVid , setIfDownloadedVid ] = useState([]) 
     const [deleteDownloadModal , setDeleteDownloadModal ] = useState(false) 
    
     const dispatch =  useDispatch()
  
    const params = useParams()
  
const currMode = useSelector(s=>s.modeData)

    const loginData = useSelector(s=>s.loginData)
  
const handleDownload = async (vid) => {
  try {

    const res = await fetch(`http://localhost:1020/api/users/download_video/${loginData?.user?._id}/${vid}`, {
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json'
      }
    } )
     
     const data = await res.json()

    
if (data?.success) {
  setDownloadtoStart(true)
return setTimeout(()=>{
  alert(data?.message)
  setDownloadtoStart(false)
  setDownload(false)
  setIfDownloadedVid(data?.user?.Downloads);

},2000  )
}
        alert(data?.message)

  } catch (error) {
    console.log(error);
    
  }
}


    const addVideosInUserLikedVid = async (vid) => {
      try {
        const res = await fetch(`http://localhost:1020/api/users/set_likedVid/${loginData?.user?._id}/${vid}` , {
method:"PUT",
headers:{
  'Content-Type' : 'application/json'
}
} )
const data = await res.json()
 ;


  } catch (error) {
        console.log(error);
        
      }
    }
  
    const romoveVideosInUserLikedVid = async (vid) => {
      try {
        const res = await fetch(`http://localhost:1020/api/users/remove_video_likedVid/${loginData?.user?._id}/${vid}` , {
method:"PUT",
headers:{
  'Content-Type' : 'application/json'
}
} )
const data = await res.json()
 ;


  } catch (error) {
        console.log(error);
        
      }
    }

    
    

    const getUser = async () => {
      try {
  const res = await fetch(`http://localhost:1020/api/users/find_user/${loginData?.user?._id}`)
  const data = await res.json() 
  setSubscribedArray(data?.user?.subscribedToChannels)
  
  
  }catch (error) {
        console.log(error);
        
      }
    }
  


useEffect(()=>{
  getUser()

},[loginData])

  
  useEffect(()=>{
    const channelSubscribedOrNot = subscribedArray?.includes( video?.channelName?._id  )
  if (channelSubscribedOrNot) {
    setSubscribe(true)
  }else{
    setSubscribe(false)
  }
    
  }, [subscribedArray , video  ] )
  
  
  
  const setDislikeDoneorNot = ()=>{
    try {
    if (disLikes?.includes(loginData?.user?._id)){
      setDisLikesDone(true)
      setLikeDone(false)
  
    }else{
  
      setDisLikesDone(false)    
    }
  
  
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  const setLikeDoneorNot  = ()=>{
    try {
    if (likes?.includes(loginData?.user?._id)){
           setDisLikesDone(false)
           setLikeDone(true)
  
    }else{
  
      setLikeDone(false)    
    }
  
  
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  const getVideoDetails = async () => {
    try {
      const vid = params?.vid
      const res = await fetch(`http://localhost:1020/api/comments/getVideoDetails/${vid} `) 
      const data = await res.json()

      
      setvideoDetails(data?.videoDetails ) 
      setLikes(data?.videoDetails?.likes || [] ); // Update likes
      setDisLikes(data?.videoDetails?.disLikes || []); // Update dislikes
    } catch (error) {
      console.log(error);
    }
  }
  
      
  
  const handleSubscribe = async (v) => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/subscribed_channel/${loginData?.user?._id}/${video?.channelName?._id}` ,{
        method:"POST",
        headers:{
          'Content-Type' : 'application/json',
        }
      })
    const data = await res.json()
    getUser()
    } catch (error) {
      console.log(error);
      
    }
  }
  


  
  const handleLikes = async (vid) => {
    try {


      if (likeDone) {
        setLikes((prevLikes) => prevLikes.slice(0, -1)); 
        romoveVideosInUserLikedVid(vid)
      } else if (!likeDone) {
        setLikes((prevLikes) => [...prevLikes, loginData?.user?._id]); 
        await   addVideosInUserLikedVid(vid)
        if (dislikeDone) {
          setDisLikes((prevDisLikes) => prevDisLikes.slice(0,-1));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisLikes = (vid) => {
    try {
      if (dislikeDone) {
        setDisLikes((prevDisLikes) => prevDisLikes.slice(0,-1));
      } else {
        setDisLikes((prevDisLikes) => [...prevDisLikes,loginData?.user?._id]  ); 
        romoveVideosInUserLikedVid(vid)
        if (likeDone) {
          setLikes((prevLikes) => prevLikes.slice(0, -1)); // Remove the last like
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  const handleGetViews = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/comments/getVideoviwes/${params?.vid}`)
       const data = await  res.json()
  
  setViews(data?.views?.numberOfviews?.length)
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const handleVideoViews = async ()=>{
    try {
  const uid = loginData?.user?._id
  const res = await fetch(`http://localhost:1020/api/comments/setVideoviwes/${params?.vid}`,{
  method:"POST",
  headers:{
  'Content-Type':"application/json",
  
  },
  body:JSON.stringify({uid})
  }) 
      const data = await res.json()
      
  
  
    } catch (error) {
      console.log(error);
      
    }
  }
  

const handleDownloadedVid = async () => {
  try {  
    const res = await fetch(`  http://localhost:1020/api/users/get_download_video/${loginData?.user?._id}`)
    const data = await res.json()
    setIfDownloadedVid(data?.user?.Downloads);
     ;
    
  } catch (error) {
    console.log(error);
    
  }
} 

  useEffect(()=>{
    handleVideoViews()
    handleDownloadedVid()
  },[])
  
  
  const handleUserResponse = async () => {
    try {
  if (videoDetails !== undefined) {
    const vid = params?.vid;
    const uid = loginData?.user?._id;
  
    const res = await fetch(`http://localhost:1020/api/comments/save_shorts_views/${vid}/${uid}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${loginData?.token}`,
      },
      body: JSON.stringify({ likes, disLikes }),
    });
  
    const data = await res.json();
    
  }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  
  useEffect(() => {
      handleUserResponse();
      setLikeDoneorNot()
      setDislikeDoneorNot()
      },[likes , disLikes]);
  
  
  
  const getVideos = async () => {
  try {
  const res = await fetch(`http://localhost:1020/api/videos/getVideos/${'All'}`)
  const data = await res.json()
  setOtherVideos(data?.videos.filter((v)=>  v._id !== params?.vid));
  }catch (error) {
  console.log(error);
  }} 
  
  
    
  const histVideo =  async () => {
    try {
      const vid = params?.vid
      const res = await fetch (`http://localhost:1020/api/users/setVideoHistory/${loginData?.user?._id}` , {
      method : 'POST',
      headers :{
      'Content-Type' :  'application/json'
      },
      body : JSON.stringify({vid})
      })
      const data = await res.json()   
      } catch (error) {
      console.log(error);
      }
      }
  
  const pasueData = useSelector(s=>s.PauseData)
  
  
  
  
  
  const getLargeVideo =  async () => {
    try { 
      const res = await fetch(`http://localhost:1020/api/videos/getVideo_for_largeVideo/${params.vid}`) 
      const data =  await res.json()
      setVideo(data?.largePageVideo )  
  
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  const handleHorizontalDots = ()=>{
    try {
      
      setShowModal(!showModal)
    
    } catch (error) {
          console.log(error);
  }}
  
  


  const handlePlaylist = ()=>{
    try {
      if (playlistOn){
        setPlaylistOn(false)
      }else{
        setPlaylistOn(true)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  
  const handleCreatePlaylist = async () => {
    try {
  const name = nameRef?.current?.value;
  
  const uid = loginData?.user?._id
      const res = await fetch(`http://localhost:1020/api/users/create_playList/${uid}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
        ,body: JSON.stringify({name,privacy})
         } )
  
  const data = await res.json()
  alert(data?.message)
  setShowModal(false)
await  handleAddToPlayList()
  } catch (error) {
      console.log(error);
      
    }
  }
  
  
  const handleAddToPlayList = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/get_playList/${loginData?.user?._id}`)
      const data = await res.json()
  
  
     setExistingPlayList(data?.playlist?.playlists) 
     
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  
  const handleSaveVideoinPlayList = async () => {
    try {
  const vid = video?._id
  
      const res = await fetch (`http://localhost:1020/api/users/save_vid_in_playList/${loginData?.user?._id}`, {
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
  body:JSON.stringify({playListName , vid})
  })
  const data = await res.json()
  
  setDataMSG(data.message)
  } catch (error) {
      console.log(error);
  }}
  
  useEffect(()=>{
    handleSaveVideoinPlayList()
  },[playListName])
  
  
  
   const [shorts, setShorts] = useState([]);
  
    const getAllShorts = async () => {
      try {
        const res = await fetch(`http://localhost:1020/api/shorts/get_all_shorts`);
        const data = await res.json();
        setShorts(data?.shorts);
      } catch (error) {
        console.log(error);
      }
    }
  
  const save_vid_in_watchLater = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/send_vid_for_watchLater/${loginData?.user?._id}/${video?._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":'application/json'
        }})
  const data = await res.json()
  
  
  
  await get_vid_from_watchLater()
  } catch (error) {
      console.log(error);
      
    }
  
  
  }
  
  

  
  const [isChecked, setIsChecked] = useState(false); 
  
  const get_vid_from_watchLater = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/get_vid_for_watchLater/${loginData?.user?._id}`)
  const data = await res.json()
  

setIsChecked(  data?.user?.WatchLater?.videos?.some(o =>  o._id === video?._id    ));



  
  } catch (error) {
      console.log(error);
      
    }
  }
  


  useEffect(()=>{
    get_vid_from_watchLater()
  },[video]  )
  
  
  const handleCheckboxChange = () => {
       save_vid_in_watchLater(); 
    };
  
  
  
  useEffect(()=>{
    getLargeVideo()
    getVideos()
    getAllShorts()
    getVideoDetails()
    if(pasueData === false) {
    histVideo()
    }
    handleAddToPlayList()
    handleGetViews()
    
  },[params?.vid])
  
  
  function calculateDaysPassed() {
    // Target date (June 7, 2024)
    const targetDate = new Date(video?.createdAt);
  
    // Current date
    const currentDate = new Date();
  
    // Calculate the difference in time (milliseconds)
    const timeDifference = currentDate - targetDate;
  
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysPassed;
  }
  
  const days = calculateDaysPassed();
  




/////// othervid date designer


function othervidCalculateDaysPassed(date) {
  // Target date (June 7, 2024)
  const targetDate = new Date(date);

  // Current date
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const timeDifference = currentDate - targetDate;

  // Convert time difference to days (milliseconds to days)
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
}


  
  const [showMore , setShowMore] = useState(false)
  const CommentsRef =  useRef() 
  
  const handleComments = async ( v,updatedVideos ) => {
    try {
  
  const vid = updatedVideos?.find(  )
  if (CommentsRef.current.value.length === 0  ) {
  return alert('please write a comment first')  
  }
  
  const commentText = CommentsRef?.current?.value 
  
  const res = await fetch(`http://localhost:1020/api/comments/setComment/${video?._id}/${loginData?.user?._id}` , {
  method:"POST",
  headers:{
    'Content-Type' : 'application/json',
  },
  body:JSON.stringify({commentText })
  })
  const data = await res.json()
  getVideoDetails()
  
  CommentsRef.current.value = ''
  
  }catch (error) {
  console.log(error);
  }}
  
  
  
  const handleCommentsLikes = async (commmentId) => {
    try {
  
      const updatedVideo = videoDetails?.commentText?.map((s)=> {
        if (s?._id === commmentId){
          let updatedLikes = s?.commentLikes;
          let updatedDisLikes = s?.commentDisLikes;
          if (!updatedLikes?.includes(loginData?.user?._id)) {
           updatedLikes.unshift(loginData?.user?._id)
           updatedDisLikes =  updatedDisLikes.filter((u)=>u.toString() !== loginData?.user?._id)
  }else{
  const  index = updatedLikes.findIndex((u)=> u.toString()  !== loginData?.user?._id  )
    updatedLikes.splice(index , 1)
  
  }
  
  return { ...s , commentLikes:updatedLikes , commentDisLikes : updatedDisLikes  }
  }
  return s 
  
  })
  
  await handleCommentLikes_andDislikes(commmentId , updatedVideo )
  await getVideoDetails()
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  const handleCommentsDisLikes = async (commmentId) => {
    try {
  
      const updatedVideo = videoDetails?.commentText?.map((s)=> {
        if (s?._id === commmentId){
          let updatedLikes = s.commentLikes;
          let updatedDisLikes = s.commentDisLikes;
          if (!updatedDisLikes?.includes(loginData?.user?._id)) {
             updatedDisLikes.unshift(loginData?.user?._id)
       updatedLikes =   updatedLikes.filter((u)=>u.toString() !== loginData?.user?._id)
  }else{
    updatedDisLikes = updatedDisLikes.filter( (u)=> u.toString()  !== loginData?.user?._id  )
  
  }
  return { ...s , commentLikes:updatedLikes , commentDisLikes : updatedDisLikes  }
  }
  return s 
  
  
  
  })
  
  await handleCommentLikes_andDislikes(commmentId , updatedVideo )
  
  await getVideoDetails()
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  const handleCommentLikes_andDislikes = async (commmentId , updatedVideo ) => {
    try {
  
  const clickedComment =     updatedVideo?.find((commentObj)=> commentObj._id.toString()  === commmentId  )  
  
  const updatedLikes =  clickedComment.commentLikes  
  const updatedDisLikes = clickedComment.commentDisLikes  
  
  
  
  
    const res =  await fetch(`http://localhost:1020/api/comments/setComment_likes_disLikes/${videoDetails?._id}/${commmentId} ` , {
        method:"POST",
        headers:{
          "Content-Type" : 'application/json'
        },
  body:JSON.stringify({updatedLikes , updatedDisLikes})
  
  }  )    
  const data = await res.json()
   
  
   
  
  }catch (error) {
      console.log(error);
      
    }
  }
  
  
  const handleDeleteDownload = async (vid) => {
    try {



      const res = await fetch(`http://localhost:1020/api/users/deleteDownload_video/${loginData?.user?._id}/${vid}`,{
        method:"PUT",
        headers:{
          "Content-Type": 'apllication/json'
        }
      })
const data = await res.json()
 ;
setIfDownloadedVid(data?.user?.Downloads);
alert(data?.message)
setDeleteDownloadModal(false)
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  
  const handleDeleteComment = async (v) => {
    try {
      
  const res = await fetch(`http://localhost:1020/api/comments/deleteComment/${videoDetails?._id}/${v}`)
  const data = await res.json()
  await getVideoDetails()
    } catch (error) {
      console.log(error);
      
    }
  }
  


useEffect(()=>{
  handleDownloadedVid
},[downloadStarted])


  
  return {getVideoDetails,othervidCalculateDaysPassed,currMode,calculateDaysPassed,handleDeleteDownload, download ,downloadedVid,deleteDownloadModal , setDeleteDownloadModal ,handleDownload, downloadStarted  ,  setDownloadtoStart, setDownload, handleCommentLikes_andDislikes,handleCommentsLikes, setShowMore, get_vid_from_watchLater,setIsChecked, save_vid_in_watchLater,getAllShorts,setShorts,handleSaveVideoinPlayList, histVideo,getLargeVideo,pasueData, getVideos, handleUserResponse ,handleGetViews,handleVideoViews ,setDislikeDoneorNot,setLikeDoneorNot,subscribedArray,getUser ,dispatch ,params,  setSubscribedArray  , setSubscribe,playListName,setplayListName,setExistingPlayList, setOtherVideos,dataMsg , setDataMSG, privacy , setPrivacy,setViews,setDisLikesDone, setLikeDone ,disLikes,setDisLikes, setLikes,setvideoDetails,existingPlayList,handlePlaylist,handleAddToPlayList,playlistOn,nameRef , handleCommentsLikes, handleComments,  handleCreatePlaylist,  handleCheckboxChange,isChecked,video,subscribed,handleCommentsDisLikes ,handleSubscribe,handleDeleteComment,likeDone,handleLikes,likes,handleHorizontalDots,showModal,views,days,showMore,videoDetails,CommentsRef,shorts,otherVideos,loginData  ,dislikeDone,handleDisLikes }
  
}        