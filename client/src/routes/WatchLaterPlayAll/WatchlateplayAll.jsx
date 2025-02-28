import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useEffect,  useRef,  useState } from 'react'
import { BiLike, BiLinkExternal } from "react-icons/bi";
import { BiDislike, } from "react-icons/bi";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PiShareFat } from "react-icons/pi";
import { RxCross1, RxCross2, RxDotsVertical } from 'react-icons/rx';

import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FiPlus } from 'react-icons/fi';
import { CiLock } from 'react-icons/ci';

const WatchlateplayAll = () => {
  
  const [playListName,setplayListName] = useState()
  const loginData = useSelector(s=> s.loginData)
  const [videoDetails, setvideoDetails] = useState();
const [likes,setLikes] = useState(  videoDetails?.likes || []  )
const [disLikes,setDisLikes] = useState(videoDetails?.disLikes || [] )
  const [dislikeDone , setDisLikesDone] = useState()
const [ videos ,  setVideos ] = useState([])
const [subscribed , setSubscribe] = useState()
 const [likeDone , setLikeDone] = useState()
const [ video ,  setFirstVideos ] = useState()
const [views,setViews] = useState()
  const [showModal,setShowModal] = useState(false)
  const [showMore , setShowMore] = useState(false)
    const [dataMsg , setDataMSG] = useState()
    const [privacy , setPrivacy ] = useState()
  
    const [playlistOn, setPlaylistOn]= useState(false)
  const [isChecked, setIsChecked] = useState(false); 
    const [subscribedArray  ,  setSubscribedArray ] = useState([])
    const [existingPlayList,setExistingPlayList] = useState()
    const dispatch =  useDispatch()
  const nameRef = useRef()

  

const handleSubscribe = async () => {
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
useEffect(()=>{
  const channelSubscribedOrNot = subscribedArray.includes( video?.channelName?._id  )
if (channelSubscribedOrNot) {
  setSubscribe(true)
}else{
  setSubscribe(false)
}
  
}, [subscribedArray , video  ] )



const handleGetViews = async () => {
  try {
    const vid = video?._id
    const res = await fetch(`http://localhost:1020/api/comments/getVideoviwes/${vid}`)
     const data = await  res.json()

setViews(data?.views?.numberOfviews.length)
  } catch (error) {
    console.log(error);
    
  }
}



const handleHorizontalDots = ()=>{
  try {
    if(showModal === true  ) {
      setShowModal(false)
      }else if (showModal=== false) {
      setShowModal(true)
      }} catch (error) {
        console.log(error);
}}

const getVideoDetails = async () => {
  try {
    const vid = video?._id
    const res = await fetch(`http://localhost:1020/api/comments/getVideoDetails/${vid} `) 
    const data = await res.json()
    setvideoDetails(data?.videoDetails)
    setLikes(data?.videoDetails?.likes || []); // Update likes
    setDisLikes(data?.videoDetails?.disLikes || []); // Update dislikes

  



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



useEffect(() => {
    handleUserResponse();
    setLikeDoneorNot()
setDislikeDoneorNot()
}, [likes , disLikes]);


const handleUserResponse = async () => {
  try {
if (videoDetails !== undefined) {
  
  const vid = video?._id
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




const handleLikes = () => {
  try {
    if (likeDone) {
      setLikes((prevLikes) => prevLikes.slice(0, -1)); 
    } else if (!likeDone) {
      setLikes((prevLikes) => [...prevLikes, loginData?.user?._id]); 
      if (dislikeDone) {
        setDisLikes((prevDisLikes) => prevDisLikes.slice(0,-1));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const handleDisLikes = () => {
  try {
    if (dislikeDone) {
      setDisLikes((prevDisLikes) => prevDisLikes.slice(0,-1));

    } else {
      setDisLikes((prevDisLikes) => [...prevDisLikes,loginData?.user?._id]  ); 

      if (likeDone) {
        setLikes((prevLikes) => prevLikes.slice(0, -1)); // Remove the last like
      }
    }
  } catch (error) {
    console.log(error);
  }
};





function calculateDaysPassed() {
  const targetDate = new Date(video?.createdAt);

  const currentDate = new Date();

  const timeDifference = currentDate - targetDate;

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
}

const days = calculateDaysPassed();


const handleWatchLater = async () => {
  try {
    const res = await fetch(`http://localhost:1020/api/users/get_WatchLater_vid/${loginData?.user?._id}`)
    const data = await res.json()
     ;
 
    setVideos( data?.getWatchLater?.WatchLater?.videos)
    return    setFirstVideos(data?.getWatchLater?.WatchLater?.videos[0] )
    
    
    } catch (error) {
    console.log(error);
    }}



const histVideo =  async () => {
  try {

    const vid = video?._id
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

useEffect(()=>{
  handleWatchLater()

},[] )

const pasueData = useSelector(s=>s.PauseData)








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




const getUser = async () => {
  try {
const res = await fetch(`http://localhost:1020/api/users/find_user/${loginData?.user?._id}`)
const data = await res.json() 
setSubscribedArray(data?.user?.subscribedToChannels)


}catch (error) {
    console.log(error);
    
  }
}


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
 ;
await get_vid_from_watchLater()
} catch (error) {
    console.log(error);
    
  }


}
const get_vid_from_watchLater = async () => {
  try {
    const res = await fetch(`http://localhost:1020/api/users/get_vid_for_watchLater/${loginData?.user?._id}`)
const data = await res.json()


setIsChecked(data?.user?.WatchLater?.videos?.includes(video?._id)) 
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
  getVideoDetails()
  if(pasueData === false) {
  histVideo()
  }
  handleAddToPlayList()
  handleGetViews()
  getUser()
},[video?._id])




    return (
   
<>
   <div className='large-video-page' >   
<div  className='large-video-container text-light' >
<iframe src={video?.video.split('..\\client\\public').join('..\\..\\') }  className='video-screen' ></iframe>
<h5 style={{  height:"3%" }} >  {video?.title} </h5>
<div className='large-videos-channel-btn-container' >
<div className=' d-flex large-video-channel-container'  style={{ justifyContent:"space-between" ,width:"35%"}} > 
<img src= { video?.channelName?.profilePicture.split('..\\client\\public').join('..\\..\\')   }   className=' large-video-profile-image mt-3'   width="14%" height="55%" />
<div  className=' text-center '  style={{ height:"100%", maxWidth:"50%"}} >
<h6  className='mt-3'  style={{   height:".7rem" }} >{video?.channelName?.channel}       </h6>
<p style={{fontSize:".8rem",marginRight:"1.5rem", marginBottom:"1rem"  }} >             {video?.subscribers ?  `k subscribers${video?.subscribers}` :      0  } </p>
</div>        
<button className= {subscribed  ? ' btn btn-dark   large-vid-subscribeBtn'  : 'btn btn-light   large-vid-subscribeBtn'  } onClick={handleSubscribe} >  { subscribed ? 'Subscribed'  :  'Subscribe'  }      </button>
</div>
<div className='large-video-Allbtn-container'> 
<button className={likeDone ?   'likeDone-btn' :  'like-btn'}onClick={handleLikes}   ><BiLike  className='mb-1 ' style={{fontSize:"1.5rem"}}/>  {likes?.length}    </button>
<div style={{backgroundColor:"white", display:"inline" , border:"0.01px solid grey" }} ></div>
<button  className={dislikeDone ? 'unlikeDone-btn'  : 'unlike-btn'}  onClick={  handleDisLikes }  ><BiDislike  className='mb-1 ' style={{fontSize:"1.5rem"}} /></button>
<button  className='share-btn  mx-1'><PiShareFat/> Share </button>
<button  className='download-btn mx-1'><LiaDownloadSolid className='' style={{fontSize:"1.5rem"}} /> Download </button>
<button className=' horizontal-dots ' onClick={handleHorizontalDots} ><HiOutlineDotsHorizontal  className='HiOutlineDotsHorizontal'   /></button>



{showModal === true  ?  <div className='HiOutlineDotsHorizontal_modal' > 
<div className='HiOutlineDotsHorizontal_modal_firstDiv' > <p>Save Video to...</p>   <RxCross1  className='MdOutlineCancel' onClick={handleHorizontalDots} />
</div>
<div   className='option_container' >
<div   className='HiOutlineDotsHorizontal_modal_SecondDiv'> 
<input type="checkbox" className='FaRegSquare'  checked={isChecked} onChange={handleCheckboxChange} />
<MdOutlineFeaturedPlayList className='MdOutlineFeaturedPlayList'  onClick={handleAddToPlayList}  />   
<FiPlus className='FiPlus' onClick={handlePlaylist} />  </div>


<div   className='HiOutlineDotsHorizontal_modal_playlist_div'   > <p>Watch Later</p> <select   className='select_PlayList' onClick={(e)=>{setplayListName(e.target.value)}}  >  <option> PlayLists </option>

{existingPlayList?.map((p)=> <option value={p.name}    >   {p.name}   </option> )}
  </select>  <p onClick={handlePlaylist}  > Create a playlist  </p> </div>
<div className='HiOutlineDotsHorizontal_modal_playlist_div'  onClick={handlePlaylist} >  <p >  <CiLock />   </p>  </div>
</div>
{playlistOn === true   ? <><input type="text"  ref={nameRef}  placeholder='Name'  className='playlistName' /> 
<select  className='playlistSelectPrivacy' onClick={(e)=>{setPrivacy(e.target.value)}} >   
<option   > Privacy </option>
<option  value='Public' > Public </option>
<option  value='Private' > Private </option>
</select>
<button  className='create_playList'  onClick={handleCreatePlaylist}  > Create </button>

</>   :    null   }

     </div>


: null  }


  
   </div>

</div>

<div   className='large-video-details-container' >  
  
  <div>  <div  className='views_and_Date_container' >      <p>  {views} views   </p>              <p> {days} days ago  </p>  </div>
    <Link> {video?.tags} </Link><br />
  <p className=' videoPage_description_para '  > {    showMore ?   video?.description?.substring(0,20)  :  video?.description?.substring(0,2)    } </p>

{ showMore ? <p className='showMore_btn' onClick={()=> { setShowMore(false)} } >  show less ...  </p>  :  <p  className='showMore_btn'  onClick={()=> { setShowMore(true)} } >  show more ...</p>  }   

  </div>
   </div>

<div  className='large_vid_page_comments_container' >   
  
  <h4  className='comments_heading_video_page' > {videoDetails?.commentText?.length } Comments </h4>
 
 <div   className='comments_input_video_page_container'> 
  <img src= { video?.channelName?.profilePicture.split('..\\client\\public').join('..\\..\\')}  className='large-video-comments_profile-image' alt="" /> 
 
 
 <div className='comments_input_video_page_main_container' > 
<input type="text" ref={CommentsRef}   className='large_video_comment_input' placeholder='Add a comment' required  />  

<div  className='largeVid_comment_btn_Container' >   
  <button className='btn btn-outline-dark' > cancel </button>
  <button className='btn btn-info' onClick={()=>{handleComments(video._id,   )}  } > Comment </button>
  
  </div></div>

</div>
 
{ videoDetails?.commentText?.map((v)=> <div   className='user_comments_video_page_container'> <img src= {v?.user?.profilePicture.split('..\\client\\public').join('..\\..\\')  }        className=' large-video-commented_user_profile-image ' alt="" /> 
 <div  className='user_comments_video_page'   >
<snap className='commented_user_name' > {v?.channel}  </snap>
  <p > {v?.text}  </p>
 <div className='comments_like_disLike_btn' > 
<div>   <BiSolidLike       className={ v?.commentLikes?.includes(loginData?.user?._id) ? 'text-info' :'text-light'   }         onClick={()=> {handleCommentsLikes(   v?._id   ) } }  /> <snap className='coments_like_num' >{v?.commentLikes?.length}  </snap>   </div>
<BiSolidDislike className={ v?.commentDisLikes?.includes(loginData?.user?._id)  ?  'text-danger' :'text-light'   }          onClick={()=> {handleCommentsDisLikes(   v?._id   ) } }    />   </div>
 </div>
 
  <div className='videosPage_RxDotsVertical dropdown '  data-bs-toggle="dropdown" aria-expanded="false" > 
  

<RxDotsVertical/> 

<ul className="dropdown-menu lagreVid_comment_delete_dropdown  " >  

  { v?.user?._id  === loginData?.user?._id ? <p      onClick={()=>{handleDeleteComment(v?._id)  } }  >  Delete Comment  </p>
  :   
  <p       >  Report Comment </p>
      } 
  
  
    </ul>


   </div>

  




  </div>
 )
 }
</div>


   </div>



   <div className='download-video-playlist'  > 

<div  className='download-playlist-heading' ><p> WatchLater  </p> <p className='mx-2' > <RxCross2/>   </p>  </div> 

<div className='download-videos-in-playlist' >
{videos?.map((v,i  )=>   <div   key={i}  className='do' style={{ justifyContent:"space-around",display:"flex" , height:"12vh",marginTop:".5rem",  }} > 
<img  src={v.thumbnail.split('..\\client\\public').join('..\\..\\') } style={{  border:"2px solid grey", borderRadius:"1rem" ,width:"10vw"}} />
   <div style={{display:"flex", flexDirection:"column",width:"19vw" }}> <h6  className='text-white' > {v?.title} </h6> 
<p  className='text-secondary'  style={{ marginTop:"1rem",fontSize:".8rem" }} > {v?.channelName?.channel} </p>

</div> 
</div>  )}
</div>

  </div>


  </div>
        </>
  )
}

export default WatchlateplayAll