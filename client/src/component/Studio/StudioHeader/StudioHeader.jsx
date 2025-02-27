import React, { useState } from 'react'
import { BsYoutube } from 'react-icons/bs'
import { MdOutlineMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Studioheader.css'
import { RiVideoAddLine } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import Selectfile from '../../../routes/Studio/Content/SelectfileModel/Selectfile'
import UploadVideoDetails from '../../../routes/Studio/Content/upload-vid-details/UploadVideoDetails'
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useSelector } from 'react-redux'




const StudioHeader = () => {
const [showModal,setShowmodal] = useState(false)
const [videoFile , setVideoFile] = useState() 
const [videoUrl , setvideoUrl] = useState('') 



const togglemodal = ()=>{
  
  try {
if (showModal === true  ) {
  setShowmodal(false)
  
}else if (showModal=== false) {
  setShowmodal(true)
  }

  } catch (error) {
    console.log(error);
    
  }
}

const loginData = useSelector(s=>s.loginData)







return (
<header  className='studio_header' >
{ showModal === true ? videoFile || videoUrl ?  <UploadVideoDetails  videoUrl={videoUrl} videoFile={videoFile} setvideoUrl={setvideoUrl}   setVideoFile={setVideoFile} /> :<Selectfile      setvideoUrl={setvideoUrl} videoFile={videoFile} setVideoFile={setVideoFile}  togglemodal={togglemodal}  />
 :<></> }

<div  className='STUDIO_HEADER_FIRST_div' >     <Link className="navbar-brand  " to="#"> <MdOutlineMenu className=' studio_bar_Menubar'/></Link>
     <Link className=" studio_youTubeLogo " aria-current="page" to="#"><BsYoutube className='studio_header-youtubelogo'/>Studio</Link>
</div>
<div className='studio_header_search_input_container'><CiSearch  className='studio_CiSearch'  />  <input type="search" placeholder='Search across your channel'   className='studio_header_search_input'  />   </div>
<div  className='studio_header_thirdDiv' > <Link>  <RxQuestionMarkCircled className='RxQuestionMarkCircled'  />   </Link>  <button  className='upload_video'  onClick={togglemodal} >  <RiVideoAddLine  className='studio_RiVideoAddLine' />upload </button> 
<img src={loginData?.user?.profilePicture?.split('..\\client\\public').join('..\\..\\')   } alt=""  className='studio_header_profileimg' />  </div>
    

</header>    

)
}

export default StudioHeader