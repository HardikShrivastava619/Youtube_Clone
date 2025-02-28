import { LiaDownloadSolid } from 'react-icons/lia'
import { MdSort } from "react-icons/md";
import { PiLineVerticalThin } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import {Link} from 'react-router-dom';
import './LikedVid.css'
import { LikedVideoJS } from './LikedVideos.js';
import { RiDeleteBin6Line } from 'react-icons/ri';
  

const LikedVideos = () => {

const {handleWatchLater, currMode, navigate,bgi,loginData, LikedVideo , calculateDaysPassed, firstVideos ,  setFirstVideos ,setLikedVideos,  hideRexcross,setHideRexcross } = LikedVideoJS()

console.log(LikedVideo);


  return (
    <main className='watchlater-main-page' >

<div  className= 'recent-watchlater-video text-white' style={{ backgroundImage:`url(${bgi})` }}  >

<img src= { firstVideos?.thumbnail.split('..\\client\\public').join('..\\..\\')  }          alt="" className='recent-video' />
<h2   className='watch-later-heading' > Liked Videos </h2>
<p  className='watchlater-username   ' > {loginData?.user?.name.charAt(0).toUpperCase() + loginData?.user?.name.slice(1) } </p>
<span style={{fontSize:".8em" , position:"relative" , zIndex:"2"}} className='' >  {LikedVideo?.videos?.length}   videos no review  </span>
<div className='btn-container mt-2' > 
    <button className='download-watchlater-vid  '   > <LiaDownloadSolid/> </button>
<button  className='dots-watchlater-vid' > ⁝ </button>
</div>
<div  className='d-flex payallshuuflebtn' > 
    <button className=' palyallbtn ' onClick={()=>{navigate(`/WatchlaterplayAll/${LikedVideo?.videos[0]?._id}`)}} > Play all  </button> 
<button className='shufflebtn' > Shuffle </button>
</div>
<div>  </div>
</div>
<div   className='all-watchlater-videos' >

{ hideRexcross ? <></> : <div className='unavailablevid' >


<p >Unavailable videos are hidden</p>
 <h4  onClick={()=>{setHideRexcross(true)}} ><RxCross1 /></h4></div>
 }
<div className= 'sort-container text-white'   >
     <h6  > <MdSort className='MdSort_likedVid'  /> Sort</h6>
     <PiLineVerticalThin  style={{fontSize:"2rem" , color:"grey"  }} />
  <div className='sort-btn-containers' >
     <button className=  'btn btn-light'    >Videos  </button>
 </div>
</div>
{LikedVideo?.map((v)=>  <Link to={`/video/${v._id}`}   className='all-vid-likedVid'  >
<img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\')   }       alt="" className='vid-thumbnail-likedVid' />
<div   className='vid-info-main_container' > 
  <p className= 'text-white'  >  { v?.title.substring(0,110)}...  </p>
 <div  className= 'vid-info-container'  > 
<div className= 'vid-info text-silver '     >  <p> { v?.channelName?.channel } </p><LuDot/>

  <p> {v?.comments?.commentID?.numberOfviews?.length  } views  </p><LuDot/>
  <p>  {calculateDaysPassed(v?.createdAt)}days</p>
  </div>
   </div>
   </div>
   </Link> ) }
 
</div>
    </main>
  )
}

export default LikedVideos