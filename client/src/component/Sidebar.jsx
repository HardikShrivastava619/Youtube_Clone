import React, { useEffect, useState } from 'react'
import { PiUserRectangle } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiMusicNote } from "react-icons/pi";
import { PiFilmSlateLight } from "react-icons/pi";
import { CiStreamOn } from "react-icons/ci";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { GoTrophy } from "react-icons/go";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdPodcasts } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiFlagLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsDot } from "react-icons/bs";


const Sidebar = ({removesidebar2}) => {

const [subscribedChannels ,setSubscribedChannels ] = useState([])
  const loginData = useSelector(s=>s.loginData)
  
  
  const getSubscribedChannels = async () => {
    try {
      
      const res = await fetch(`http://localhost:1020/get_subscribed_channels/${loginData?.user?._id}`)  
      const data = await res.json()
      setSubscribedChannels(data?.subscribeChannels?.subscribedToChannels )
      
    }catch (error){
    console.log(error)
  }}
  





  useEffect(()=>{
    getSubscribedChannels()

  },[])
  


  
return (
    <>

   <div   className=  {    removesidebar2 ? 'video-page-SideBars' : 'SideBars'     }   >
   <div className="nav" >
   <div   className=  'div_1_sidebar'  >
     <Link  to="/youtube.com" className=' nav-link sideBar-Links '    >
     <IoMdHome className='sidebar-icons' />Home 
     </Link>
     
     <Link to="/youtube.com/shorts" className=' nav-link sideBar-Links '    >
       <SiYoutubeshorts className='sidebar-icons'/>  Shorts
     </Link>
     <Link to="/youtube.com/subscription" className=' nav-link sideBar-Links '    >
       <MdOutlineSubscriptions className='sidebar-icons '/>   Subscription
     </Link>
   
     </div>
     <div   className='div_1_sidebar'  >
     <h6 className='text-light m-3 li-sub-headings'>You &gt;</h6>
     <Link to="/youtube.com/profile" className=' nav-link sideBar-Links '    >
       <PiUserRectangle className='sidebar-icons '/>    Your Channel
     </Link>
     <Link to="/youtube.com/history" className=' nav-link sideBar-Links '>
       <GoHistory className='sidebar-icons '/>  History
     </Link>
   
  
     <Link to={`/youtube.com/PlayList/${loginData?.user?._id}`} className='nav-link sideBar-Links'>
       <MdOutlinePlaylistPlay className='sidebar-icons '/>  Playlists
     </Link>
     <Link to="/youtube.com/Studio" className=' nav-link sideBar-Links '    >
       <BiSolidVideos className='sidebar-icons '/> Your videos
     </Link>
     <Link to="/youtube.com/watchlater" className=' nav-link sideBar-Links '   >
 <MdOutlineWatchLater className='sidebar-icons '/> Watchlater
     </Link>
   
     <Link to="/youtube.com/LikedVideos" className=' nav-link sideBar-Links '  >
       <BiLike className='sidebar-icons '/> Liked videos
     </Link>
     <Link to="/youtube.com/downloads" className=' nav-link sideBar-Links '    >
       <LiaDownloadSolid className='sidebar-icons '/> Downloads     </Link>
   

</div> 

<div    className='subscribe_div'  >
       <h6 className='text-light  subscribe-headings ' > Subscriptions  </h6> 
<div  className='subscribe_div_links' >
{subscribedChannels?.map((s)=> <Link  className= 'subscribe_sideBar-Links'   >
 <img  className='subscribed_channels_profile' src={s?.profilePicture?.split('..\\client\\public').join('..\\..\\')  } alt="" /> 
  <snap  className='subscribed_channels_channel_name'  > {s?.channel?.charAt(0)?.toUpperCase() + s?.channel?.slice(1) }</snap>

  {  !s?.uploadedVideos?.every((v)=> v?.comments?.commentID?.numberOfviews?.includes(loginData?.user?._id)   ) 
   && ( <BsDot className= 'notification_BsDot'    />     )  }
   </Link>
 )}
</div>
</div>
   <div   className= 'div_1_sidebar' >
   <h6 className='text-light  li-sub-headings ' > Explore</h6>
   
   
   <a href="#" className=' nav-link sideBar-Links '    >
    <BsFire className='sidebar-icons '/> Trending </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <MdOutlineShoppingBag className='sidebar-icons '/> Shopping </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <PiMusicNote className='sidebar-icons '/>   Music </a>
   <a href="#" className=' nav-link sideBar-Links '    >
 <PiFilmSlateLight className='sidebar-icons '/> Films </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <CiStreamOn className='sidebar-icons '/> Live </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <IoGameControllerOutline className='sidebar-icons '/> Gaming </a>
   <a href="#" className=' nav-link sideBar-Links '    >
   <IoNewspaperOutline className='sidebar-icons '/> News </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <GoTrophy  className='sidebar-icons '/> Sport </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <RiGraduationCapLine className='sidebar-icons ' /> Courses </a>
   <a href="#" className=' nav-link sideBar-Links '    >
    <MdPodcasts  className='sidebar-icons '/> Podcasts </a>
   </div>

   

   <div   className='div_1_sidebar'  >  
     <a href="#"   className=' nav-link sideBar-Links '     >
       <IoSettingsOutline className='sidebar-icons'/> Settings  </a>
   
     <a href="#" className=' nav-link sideBar-Links '    >
       <RiFlagLine  className='sidebar-icons '/> Report history     </a>
     <a href="#" className=' nav-link sideBar-Links '   >
       <IoIosHelpCircleOutline  className='sidebar-icons ' /> Help   </a>
    </div>
   </div>
   <div className= ' sidebar-para-div'   >
   

  <p>About Press Copyright Contact us Creator Advertise Developers</p>
<p >  Terms Privacy Policy & Safety How YouTube worksTest new features</p>
 <p  className='text-secondary'> © 2024 Google LLC</p>
</div>
</div>
 
          </>
    
)
}

export default Sidebar













/*https://support.google.com/accounts/answer/1733224?hl=en */