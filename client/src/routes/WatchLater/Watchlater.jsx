import { LiaDownloadSolid } from 'react-icons/lia'
import { MdSort } from "react-icons/md";
import { PiLineVerticalThin } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import {Link} from 'react-router-dom';
import './WatchLater.css'
import { WatchLaterJS } from './WatchLater.js';
import { RiDeleteBin6Line } from "react-icons/ri";


const Watchlater = () => {

const {type,handleWatchLater,handlesaveshortWatchLater, navigate,bgi , setType,loginData, watchLater , calculateDaysPassed, firstVideos , remove_vid_in_watchLater, setFirstVideos ,setWatchLater,  hideRexcross,setHideRexcross } = WatchLaterJS()



  return (
    <main className='watchlater-main-page'  >




<div    className='recent-watchlater-video'  style={{ backgroundImage:`url(${bgi})` }}  >

<img src= { firstVideos?.thumbnail.split('..\\client\\public').join('..\\..\\')  }          alt="" className='recent-video' />
<h2   className='watch-later-heading' > Watch Later </h2>
<p  className='watchlater-username mt-3  ' > {loginData?.user?.name.charAt(0).toUpperCase() + loginData?.user?.name.slice(1) } </p>
<span style={{fontSize:".8em" , position:"relative" , zIndex:"2"}} >  {watchLater?.videos?.length}   videos no review  </span>
<div className='btn-container mt-2' > 
    <button className='download-watchlater-vid  '   > <LiaDownloadSolid/> </button>
<button  className='dots-watchlater-vid' > ⁝ </button>
</div>
<div  className='d-flex payallshuuflebtn' > 
    <button className=' palyallbtn ' onClick={()=>{navigate(`/WatchlaterplayAll/${watchLater?.videos[0]?._id}`)}} > Play all  </button> 
<button className='shufflebtn' > Shuffle </button>
</div>
<div>  </div>
</div>
<div   className='all-watchlater-videos' >

{ hideRexcross ? <></> : <div className='unavailablevid' >


<p >Unavailable videos are hidden</p>
 <h4  onClick={()=>{setHideRexcross(true)}} ><RxCross1 /></h4></div>
 }
<div className='sort-container'>
     <h6> <MdSort  style={{fontSize:"2rem" ,color:"grey" }} /> Sort</h6>
     <PiLineVerticalThin  style={{fontSize:"2rem" , color:"grey"  }} />
  <div className='sort-btn-containers' >
     <button className= {type === 'All' ? '  btn btn-light'  : '  btn btn-dark' }   onClick={()=>{setType('All')  }}  >All  </button>
     <button className= {type === 'videos' ? '  btn btn-light'  : 'sort-btns' }  onClick={()=>{setType('videos')  }} >Videos  </button>
     <button className={type === 'short' ? '  btn btn-light'  : 'sort-btns' } onClick={()=>{setType('short')  }} >Shorts  </button>
</div>
</div>

{ type === 'All' ?  ( <> <div  className='all-vid-container'>
 {  watchLater?.videos?.length === 0 &&  watchLater?.shorts?.length  === 0     ? <div   className='no_WatchLater_text_container' >  <img src="/youtube_img/oops.jpg"  className='no_Watchlater_img'  alt="" /> <h5  className='no_WatchLater_text' > Nothing to WatchLater </h5> </div> : watchLater?.videos?.map((v)=>  <Link to={`/video/${v._id}`}   className='all-vid'>
<img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\')   }       alt="" className='vid-screen' />
<div style={{ width:"78%",height:"100%" ,paddingLeft:".5vw" }}  className='' > 
  <p className='text-white' >  { v?.title.substring(0,110)}...  </p>
 <div  className='vid-info-container'  > 
<div className='vid-info'  >  <p> { v?.channelName?.channel } </p><LuDot/>

  <p> {v?.comments?.commentID?.numberOfviews?.length  } views  </p><LuDot/>
  <p>  {calculateDaysPassed(v?.createdAt)}days</p>
  </div>
   <h5 className='vertical-dots dropdown' data-bs-toggle="dropdown" aria-expanded="false"   > ⁝
    <p  className='dropdown-menu dropded_menu_removeWatchlater' onClick={()=>{remove_vid_in_watchLater(v?._id)}}  ><RiDeleteBin6Line/> Remove  </p>
    
    
     </h5>
   </div>
   </div>
   </Link> ) }
   {watchLater?.shorts?.map((v)=>  <Link to={`/shorts/${v._id}`}   className='all-vid'>
<img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\')   }       alt="" className='vid-screen' />
<div style={{ width:"78%",height:"100%" ,paddingLeft:".5vw" }}  className='' > 
 <p className='text-white' >  { v?.title.substring(0,110)}...  </p>
<div  className='vid-info-container'  > 
<div className='vid-info'  >  <p> { v?.channelName?.channel } </p><LuDot/>

 <p> {v?.comments?.commentID?.numberOfviews?.length  } views  </p><LuDot/>
 <p>  {calculateDaysPassed(v?.createAt)}days</p>
 </div>
  <h5 className='vertical-dots dropdown'  data-bs-toggle="dropdown" aria-expanded="false"  > ⁝ 
  <p  className='dropdown-menu dropded_menu_removeWatchlater'    onClick={()=>{handlesaveshortWatchLater(v?._id)}} >  <RiDeleteBin6Line/> Remove  </p>
  </h5>
  </div>
  </div>
  </Link> ) }

</div> 


</>) : type === 'videos' ?  <div  className='all-vid-container'>
 {     watchLater?.videos?.length === 0     ?    <div   className='no_WatchLater_text_container' >  <img src="/youtube_img/oops.jpg"  className='no_Watchlater_img'  alt="" /> <h5  className='no_WatchLater_text' > Nothing to WatchLater </h5> </div>    :      watchLater?.videos?.map((v)=>  <Link to={`/video/${v._id}`}   className='all-vid'>
<img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\')   }       alt="" className='vid-screen' />
<div style={{ width:"78%",height:"100%" ,paddingLeft:".5vw" }}  className='' > 
  <p className='text-white' >  { v?.title.substring(0,110)}...  </p>
 <div  className='vid-info-container'  > 
<div className='vid-info'  >  <p> { v?.channelName?.channel } </p><LuDot/>

  <p> {v?.comments?.commentID?.numberOfviews?.length  } views  </p><LuDot/>
  <p>  {calculateDaysPassed(v?.createdAt)}days</p>
  </div>
   <h5 className='vertical-dots  dropdown' data-bs-toggle="dropdown" aria-expanded="false"  > ⁝ 
   <p  className='dropdown-menu dropded_menu_removeWatchlater' onClick={()=>{remove_vid_in_watchLater(v?._id)}}  ><RiDeleteBin6Line/> Remove </p>
   </h5>
   </div>
   </div>
   </Link> ) }
 
 
</div>
:<div  className='all-vid-container'>
{   watchLater?.shorts?.length === 0     ?    <div   className='no_WatchLater_text_container' >  <img src="/youtube_img/oops.jpg"  className='no_Watchlater_img'  alt="" /> <h5  className='no_WatchLater_text' > Nothing to WatchLater </h5> </div>    :         watchLater?.shorts?.map((v)=>  <Link to={`/shorts/${v._id}`}   className='all-vid'>
<img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\')   }       alt="" className='vid-screen' />
<div style={{ width:"78%",height:"100%" ,paddingLeft:".5vw" }}  className='' > 
 <p className='text-white' >  { v?.title.substring(0,110)}...  </p>
<div  className='vid-info-container'  > 
<div className='vid-info'  >  <p> { v?.channelName?.channel } </p><LuDot/>

 <p> {v?.comments?.commentID?.numberOfviews?.length  } views  </p><LuDot/>
 <p>  {calculateDaysPassed(v?.createAt)}days</p>
 </div>
  <h5 className='vertical-dots dropdown' data-bs-toggle="dropdown" aria-expanded="false"  > ⁝ 
  <p  className='dropdown-menu dropded_menu_removeWatchlater' onClick={()=>{handlesaveshortWatchLater(v?._id)}}  ><RiDeleteBin6Line/> Remove   </p>
  </h5>
  </div>
  </div>
  </Link> ) }


</div>
  }
</div>
    </main>
  )
}

export default Watchlater