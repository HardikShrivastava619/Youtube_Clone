import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { BiSolidVideos } from 'react-icons/bi';
import { MdAnalytics } from "react-icons/md";
import './studioBar.css'

const Studiosidebar = () => {
  return (
<main  className='studioSidebar-main' >
<div>
  <div  className='studioSidebar-Profile-div' > 
  <snap className='studioSidebar-Profile-img'  >H</snap>   
 <snap className='studioSidebar-Profile-pra1' >Your Channel </snap>
  <p className='studioSidebar-Profile-pra2' >Hardik Shrivastava</p>
  </div>
</div>

<ul className="nav  studiobar-ul "   >
   
     <li className='studiobar-li'   >
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons   ' />Dashboard 
     </Link>
     
     <Link to="/youtube.com/Studio/Content" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <BiSolidVideos className=' studiosidebar-icons   ' />Content
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdAnalytics className=' studiosidebar-icons   ' />Analytics 
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons'/>Community 
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons   ' />Subtitles 
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons   ' />Copyright 
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <BiSolidVideos className=' studiosidebar-icons   ' />Content
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <BiSolidVideos className=' studiosidebar-icons   ' />Content
     </Link>
    </li>
</ul>

<ul className="nav  studiobar-sec-ul "   >
   
     <li className='studiobar-li'   >
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons   ' />Settings 
     </Link>
     
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <BiSolidVideos className=' studiosidebar-icons   ' />Send feedbacks
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdAnalytics className=' studiosidebar-icons   ' />Analytics 
     </Link>
     <Link to="/youtube.com" className={ ` nav-link studioSidebar-Links text-white   `}   >
     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
     <MdOutlineDashboard className=' studiosidebar-icons   ' />Dashboard 
     </Link>
    </li>
</ul>



 
</main> 

)
}

export default Studiosidebar