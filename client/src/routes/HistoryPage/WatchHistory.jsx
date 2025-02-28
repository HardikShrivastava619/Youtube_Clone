import { SiYoutubeshorts } from 'react-icons/si'
import {Link} from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePause } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import './WatchHistory.css'
import { WatchHistoryJS } from './WatchHistory.js';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';



const WatchHistory = () => {


const {navigate ,handleDlelteshort,pauseData,dispatch,shortHist,handleHideShorts,usersShortsHistory  ,showShorts, showShortsModal , setShowShortsModal,settogglePauseHistory,settoggleclearHistory,  vidHist,togglePauseHistory,toggleclearHistory,handleDeleteHist,handlePauseClearHistory,handleToggleClearHistory,handlePause,loginData, handleDleltevideo  } = WatchHistoryJS()









return(
    <>
    
{toggleclearHistory === false ?  null : <div className= 'toggleclearHistory_div'        >
<p> Clear Watch History  </p>
<p>{  loginData?.user?.name?.toUpperCase()} ( {loginData?.user?.email}) </p>
<p>Your Youtube Watch history will be cleared from all youtube apps on all device  </p>
<p> Your video recommendation will be reset but may still be influenced by activity on other Google products.  </p>
<div className='toggleClear_secondDiv'   > 
<p   onClick={()=>{settoggleclearHistory(false)}} >Cancel</p>
<p   className='text-primary'  onClick={handleDeleteHist} >Clear Watch History</p>
</div>
</div>}         
{togglePauseHistory === false ?  null : <div className= 'togglePauseHistory_pauseHist'     >
<p> Pause Watch History  </p>
<p>{loginData?.user?.name.toUpperCase()} ( {loginData?.user?.email}) </p>
<p> Pausing Youtube Watch History can make it harder to find videos  that you have watched and you may see fewer recoomadations for new videos in YouTube and other Google products.  </p>
<p> Remember ,pausing this setting doesn't delete any previous activity but you can view,edit and delete your private YouTube Watch History data at any time.When you pause and clear your watch history , YouTube features that relay on history to personalise your experience are disabled. </p>
<div className='pauseHist_modal_minidiv' > 
<p  onClick={()=>{settogglePauseHistory(false)}} >Cancel</p>
{ pauseData ?  <p  className='text-primary'  onClick={handlePause} > Reset </p>
 :  <p  className='text-primary'  onClick={handlePause} > Pause </p>
 }
</div>
</div>}       
<main  className='history-page-main-div' >
<div className='history-videos-container'>
<div className='hist-heading-div'>
<h1 className= 'WatchHist_today_heading text-white' > Watch history  </h1>

<h5 className= 'WatchHist_today_heading text-white' > Today </h5>

  <div className='shorts-head-container'  >
    <h4 className= 'text-white'    > <SiYoutubeshorts className='text-danger'/> Shorts </h4>
        <Link className= 'watchHist_menu_Link dropstart'      data-bs-toggle="dropdown" aria-expanded="false"  > ⁝
      <ul className=  "dropdown-menu  bg-dark"    >  
<li     className= 'hide_shorts_dropdown'    onClick={handleHideShorts}  >  { showShorts ? 'Hide Shorts'  :  'Show Shorts'  }     </li>
 </ul>
 
      
      
      
      
      
      
       </Link>
        </div>

    
    
    </div>


{ showShorts ===  true ? <div    className='shorts-hist-div' >



{shortHist?.map((s,i)=><Link to={`/shorts/${s?._id}`}  key={i}     className='shorts-hist' >
    
<img src={`${s?.thumbnail.split('..\\client\\public').join('..\\..\\')}`}   className='shorts-hist-thumbnail' />
<div  className='shorts-hist-info'>
<p    className= 'text-light shortsDetailsContainer '    >  {s?.description?.substring(0,20) } </p>
<div  >
<p      className='menubar_shorts dropstart '     data-bs-toggle="dropdown" aria-expanded="false"  > ⁝ 
<ul  onClick={()=>{handleDlelteshort(s)}}  className='dropdown-menu droped_menu_shorts '> 
   <li   > 
<RiDeleteBin6Line/>  Remove form History
  
</li>   </ul>



</p></div>
</div>
</Link>
)}
</div>
: <></> }
    
<div className='video-hist-div-container'>
{vidHist?.map((v, i  )=><Link  key={i} to={`/video/${v._id}`} className= 'video-hist-div'     >
<img  src={`${v?.thumbnail?.split('..\\client\\public').join('..\\..\\')  }`}   alt='thumnail_not_uploaded' className='hist-vid-thumbnail' />
<div  className='text-light  hist-vid-title-container'  >
<h5    > {v?.description?.substring(0,20)} </h5>
<p    className='hist-vid-channel-name' > {v?.channelName?.channel}   {}  </p>
</div>


<Link className= 'MdOutlineCancel '     onClick={()=>{handleDleltevideo(v)}}  > <RxCross2 className='history_Vid_delete_icon'  />
 </Link> <p> ⁝</p>
</Link>
)}
</div>
</div>

<div className= 'search-hist-options'      >
<CiSearch  className='CiSearch'/>
<input type="search" placeholder='Search watch history'  className='history-search '/>
<div  className='hist_manage_options'>
<p className= 'hist_page_clear_hist'     onClick={handleToggleClearHistory}> <RiDeleteBin6Line  className='RiDeleteBin6Line'/> Clear Watch history </p>
<p className= 'hist_page_clear_hist'   onClick={handlePauseClearHistory }> <AiOutlinePause  className='RiDeleteBin6Line'    /> Pause Watch history </p>
<p className= 'hist_page_clear_hist' > <IoSettingsOutline  className='RiDeleteBin6Line' /> Manage all history </p>
<div   className='watch_hist_links_container'>
<Link  className='watch_hist_links' > Comments</Link>
<Link  className='watch_hist_links'  > Posts </Link>
<Link  className= 'watch_hist_links' > Live chat </Link>
</div> 
</div> 
</div>  
</main> 
</>)}


export default  WatchHistory; 
