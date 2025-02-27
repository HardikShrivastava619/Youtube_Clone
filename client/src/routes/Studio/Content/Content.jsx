import React, { useState } from 'react'
import './Content.css'
import { Link } from 'react-router-dom'
import Selectfile from './SelectfileModel/Selectfile'
import UploadVideoDetails from './upload-vid-details/UploadVideoDetails'


const Content = () => {


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



  return (<>
{ showModal === true ? videoFile || videoUrl ?  <UploadVideoDetails  videoUrl={videoUrl} videoFile={videoFile} setvideoUrl={setvideoUrl}   setVideoFile={setVideoFile} /> :<Selectfile     setvideoUrl={setvideoUrl} videoFile={videoFile} setVideoFile={setVideoFile}  togglemodal={togglemodal}  />
 :<></> }


      <main   >

<div className='content-container' >
<div  className='videos-heading-container' >
<Link  className='content-videos-links' >Playlist</Link>
</div>
<div    className='playlist-subheadings'  >
<Link   className='content-videos-links' >Type</Link>
<Link className='content-videos-links'>Visiblity</Link>
<Link className='content-videos-links'>Last updated</Link>
<Link className='content-videos-links'>Video count</Link> </div>
</div>
<div className='vid-content-second-div'  >
  
<img  className='vid-content-second-div-img'  src="\images\thumbnails\Screenshot (179).png" alt="" />
<p>Create your playlist,then add existing content or upload new videos</p>
<button  className='btn btn-light light-btn-content  '  onClick={togglemodal} > Upload videos</button>

</div>   


    </main>
    </>
)
}

export default Content