import React, { useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import './ShortSelectfile.css'
import { Link } from 'react-router-dom'



const Selectfile = ({togglemodal,shortFile,setshortUrl,setshortFile}) => {
const [urlinput , seturlinput ]= useState(false)
const urlRef = useRef()




  return (
    <div className="upload-vid-modal-container"   >

    <div  className='upload-vid-heading-container' >
    <p className='upload-vid-heading' >Upload Shorts </p>
    <p className='upload-vid-heading'   >  <RxCross2  onClick={togglemodal}  style={{cursor:"pointer"}}  />  </p>
    </div>
    
    
    <div  className='upload-vid-img-maincontainer'> 
      
      <div    className='upload-vid-image-container'>
        <img   className='upload-vid-image' src="\images\additionalimages\Screenshot (173).png" alt="failed_to_load_img" />
    <p>Drag and drop videos fils to upload</p>
    <p>Your videos will be private until you publish them.</p>

    {urlinput === true ?<><input type="url" ref={urlRef}   className=' form-control url-input'  />
    <button  className=' url-input-next   ' onClick={(e)=>{setshortUrl(urlRef.current.value)    }  }   > Next  </button> </>  :  <>  <label   className='btn btn-light select-files-light-btn'>  {shortFile ?  shortFile.name : 'select file' }
    <input     accept="video/*" name="video" type="file"multiple onChange={(e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video')) {
            setshortFile(file);
        } else {
            alert("Please select a valid video file.");
        }
    }} 
    hidden 
/>
 </label>
    <snap> Or </snap>
  <p className='URL-input-Link  '  onClick={()=>{seturlinput(true) }} > Video URL   </p>
  </>
}

      </div>

    <p  className='upload-vid-modal-extra-info'>By submitting your videos to YouTube, you acknowledge that you agree to YouTube's <Link  className='upload-vid-modal-extra-info-link' >  Terms of Service</Link> and  <Link className='upload-vid-modal-extra-info-link' > Community Guidelines</Link> .
    
    </p>
    <p  className='upload-vid-modal-extra-info2'>Please make sure that you do not violate others' copyright or privacy rights. <Link  className='upload-vid-modal-extra-info-link'>  Learn more</Link>
    </p>
    
       </div>
       </div>
  )
}

export default Selectfile