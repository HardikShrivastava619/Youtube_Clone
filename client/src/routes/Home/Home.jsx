import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { HomeJS } from './Home';
import { MdOutlineWatchLater } from "react-icons/md";
import { MdDoNotDisturb } from "react-icons/md";
import './Home.css'

const Home = () => {


const{videoDetails,category,setCategory,showAdv,watchLaterShorts,handlesaveshortWatchLater,getShorts,handleNotIntrestedShorts, advertisementimg,cancelAdvertisement ,setAdvertisementimg,setvideoDetails,shortsDetails,save_uploaded_Videos, setshortsDetails,advertisement, setadvertisement ,loginData  ,options  ,handleNotIntrested,getVideos}=  HomeJS()





function calculateDaysPassed(date) {
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


//


return (
  <div  className='home-Container'>
  <div   className='option-main-container'> 
  {options?.map((o,i )=> <div onClick={()=>{setCategory(o)}}  key={i} className={ category === o  ?  'options-container bg-light text-black ' :  'options-container' }     > {o} </div> )}  </div>
 {showAdv ? <> <div  onClick={cancelAdvertisement}  className= ' cancel-advertisment '  > <RxCross1/> </div>
 <img src={advertisementimg[advertisement] } alt="diwalidisc.jpeg"    className=     ' advertisementIMG   '      /></>   : <></>  }   
  <div     className= 'video-Conatiner'    >  
  {       videoDetails?.length === 0     ?   <div className='no_vid_found_div' >  <img  className='home_nvf_img' src="/youtube_img/oops.jpg" alt="no_img_found" />
    <h5 className='home_nvf_img_text' > oop's no match found </h5></div>              :
   videoDetails?.map((v , i)=>  i < 9 ?  <Link to={`/youtube.com/video/${v._id}`}   key={i}   className='videos-div'      >
  <img src={v?.thumbnail?.split('..\\client\\public').join('..\\..\\') } alt=""  className='home-thumbnail'  />
  <div  className= 'homepage-videos-info-container'   >
  <div  className='vid-info-Container-home'    >
  <img src={v?.channelName?.profilePicture?.split('..\\client\\public').join('..\\..\\')    } alt="" className= 'vid-chaneel-profilepic-home'      />
  <div>
  <h6  className='vid-title-home'   > {v.title.substring(0,40)}  </h6>
  <Link  className= 'vid-channel-home'    > {v?.channelName?.channel} </Link>
  <p> {v?.comments?.commentID?.numberOfviews?.length || 0 } views.{calculateDaysPassed(v?.createdAt)} days ago </p>
  </div>
  </div>
  <div  className='vid-menubar-home'  >
  <Link    className=    "dropstart vid-dropdown-home "   data-bs-toggle="dropdown" aria-expanded="false"   > ⁝ 
  <ul className="dropdown-menu   " >  
<li    className= 'vid-not-intrested-home'    onClick={()=>{handleNotIntrested(v._id)}} > not intrested  </li>

  </ul>
  
  
  </Link>
  
  </div>  </div> 
  </Link>    : <></>  )}
  </div>

<div className= 'shorts_div_home'   >
{/**/  shortsDetails?.map((s)=>  <Link   to={`/youtube.com/shorts/${s?._id}`}  className='home_page_shorts'   >  
<img src={s?.thumbnail?.split('..\\client\\public').join('..\\..\\')  } alt="thumbnail not found"  className=  'shorts_thumnbnail_home_page'      />  
<div  className='shorts_detail_container'  >  
<p className=   'Shorts_description_home'   >{s?.description?.substring(0,30) }   </p>
<Link  className=   'Shorts_threedots_home dropstart '   data-bs-toggle="dropdown" aria-expanded="false"     > ⁝ 
<ul   className="dropdown-menu header-dropdown-ul_notIntr  "    >  
<li     className= 'vid-not-intrested-home   text-white'      onClick={()=>{handleNotIntrestedShorts(s?._id)}} >
<MdDoNotDisturb className='  text-white' />  not Intrested 
    </li>
    <li  className='vid-not-intrested-home'  onClick={()=>{handlesaveshortWatchLater(s?._id)}} >
    
    <MdOutlineWatchLater  />    { watchLaterShorts?.some(o =>  o?._id === s?._id)   ?     'Remove Watchlater ' : 'Watch Later'   }    
    </li>

  </ul>
 



</Link> 

</div>

<Link className='shorts_views_container'      > {s?.comments?.commentID?.numberOfviews?.length || 0 }views  </Link>

</Link>    ) }
</div>



<div     className='video-Conatiner'>  
{videoDetails?.map((v , i)=>  i >= 9 ?  <Link to={`/youtube.com/video/${v._id}`}   key={i}   className= 'videos-div'      >
  <img src={v.thumbnail.split('..\\client\\public').join('..\\..\\') } alt=""  className=  'home-thumbnail'   />
  <div  className=  'homepage-videos-info-container'   >
  <div  className='vid-info-Container-home'     >
  <img src={v?.channelName?.profilePicture?.split('..\\client\\public').join('..\\..\\')    } alt="" className= 'vid-chaneel-profilepic-home'       />
  <div>
  <h6  className='vid-title-home'   > {v.title.substring(0,40)}  </h6>
  <Link  className=  'vid-channel-home'     > {v?.channelName?.channel} </Link>
  <p> {v?.comments?.commentID?.numberOfviews?.length || 0 } views.{calculateDaysPassed(v?.createdAt)} days ago </p>
  </div>
  </div>
  <div  className='vid-menubar-home' >
  <Link    className=    "dropstart vid-dropdown-home "   data-bs-toggle="dropdown" aria-expanded="false"   > ⁝ 
  <ul className= "dropdown-menu-not-intrested dropdown-menu   "   >  
<li    className='vid-not-intrested-home'     onClick={()=>{handleNotIntrested(v?._id)}} > not intrested  </li>

  </ul>
  
  
  </Link>
  
  </div>  </div> 
  </Link>    : <></>  )}
  </div>





  </div>
 )
 };

 export default Home;

 



/*
*/