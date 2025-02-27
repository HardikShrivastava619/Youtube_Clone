import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ShortsSelectFile from './Shorts_select_File/ShortsSelectFile.jsx'
import ShortsUploadForm from './Shorts_upload_form/ShortsUploadForm.jsx'
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from 'react-icons/ri'


const Content_Shorts = () => {
    const [toggleclearDelete, setToggleclearDelete ] = useState(false)
    const [vid,setVid] = useState([])
    const [selectedVid ,        setSelectedVid] = useState()
    const [showModal,setShowmodal] = useState(false)
    const [shortFile , setshortFile] = useState() 
    const [shortUrl , setshortUrl] = useState('') 
    
    
    const loginData = useSelector(s=>s.loginData)
    
        
    
    
      const getVid = async () => {
        try {
            const res =   await fetch(`http://localhost:1020/getuploadedShorts_sid/${loginData?.user?._id}`)
            const data = await res.json()
            setVid(data?.shorts)
    console.log(data);
    
    
        } catch (error) {
    console.log(error);
            
        }
    
    }
    
    const handleRemove = async (v) => {
      try {
    
        const sid = selectedVid?._id
    console.log(vid)
    
      const res = await fetch(`http://localhost:1020/delete_selected_short/${sid}` , {
        method:"DELETE"
      } )
      const  data  = await res.json()
      alert(data?.message)

      setToggleclearDelete(false)
      getVid()
      } catch (error) {
        console.log(error);
    }}
    
    const togglemodal = async () => {
      try {
        
if (!showModal) {
setShowmodal(true)
}else{
  setShowmodal(false)
}
}catch(error) {
console.log(error);
}}
    

    
    
    const formatDate = (dateStr) => { const dateObj = new Date(dateStr);
       const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
       const year = dateObj.getUTCFullYear(); 
       return `${day}/${month}/${year}`; };
    
    useEffect(()=>{
        getVid()
    },[])


    console.log(vid);
    
    
    
      return (
        <>
{ showModal === true ? shortFile || shortUrl ?  <ShortsUploadForm  shortUrl={shortUrl} shortFile={shortFile} setshortUrl={setshortUrl}   setshortFile={setshortFile} /> :<ShortsSelectFile     setshortUrl={setshortUrl} shortFile={shortFile} setshortFile={setshortFile}  togglemodal={togglemodal}  />:<></> }
       
        <main  >
    <div    className='content-vid-main'   > 
    <div   className='content-vid_content-container' >
    <div  className='content-vid_videos-heading-container' >
    <Link  className='content-videos-headings' >Shorts</Link>
    </div>
    <div    className='content-videos-heading-container'  >
    <Link   className='content-videos-headings' >Type</Link>
    <Link className='content-videos-headings'>Visiblity</Link>
    <Link className='content-videos-headings'>Uploaded on </Link>
    <Link className='content-videos-headings'> viewRating </Link> 
    <button  className='btn btn-secondary' onClick={togglemodal}  > + </button>    
    </div>
    </div>
    </div>
    
    
    <div className='content-vid-container'  >
    {vid?.map((v)=>  <div    className='content-vid-body'  > 
    
    <div  className='contentvid-thumbnail-container'   >
    <img src= {v?.thumbnail?.split('..\\client\\public').join('..\\..\\..\\..\\')  }       alt=""  className='content_vid_thumbnails'  />
    </div>
    
    {toggleclearDelete === false ?  null : <div  className='delete_vid_toggle' >
    <div>
    <p> Are You sure You want to Remove this Video from your channel  </p>
    <p> Remember once you delete it you wont be able to undo it . </p>
    
    <p>{  loginData?.user?.name.toUpperCase()} ( {loginData?.user?.email}) </p>
    </div>
    <div    className='cacnel_toggle_container' > 
    <p  onClick={()=>{setToggleclearDelete(false)}} >Cancel</p>
    <p  onClick={handleRemove} className='text-primary'>Remove video</p>
    </div>
    </div>}  
    <div  className='cont_vid_vid_details' >
    <p className='con_vid_playList' > {v?.category} </p>
    <p className='con_vid_playList'  >{ v?.madeForKids ? 'Universal'  : 'not For Kids'  }  </p>
    <p className='con_vid_playList' > { formatDate( v?.createAt)} </p>
    <p className='con_vid_playList_allow'> {v?.allowViewRatings ? "Allow"  : " Not Allow" } </p>
    <div class="dropdown">
    <div class="dropdown">
      <button  className='  cont_vid_three_dots' type="button" data-bs-toggle="dropdown" aria-expanded="false"  onClick={()=>{  setSelectedVid(v)  }}  > <BsThreeDotsVertical/> </button>
      <ul className="dropdown-menu  ">
        <li   ><Link class="dropdown-item" onClick={()=>{setToggleclearDelete(true)  }  } >   <RiDeleteBin5Line className='playList_modal_RiDeleteBin5Line' />   <snap>Remove  </snap>    </Link></li>
      </ul>
    </div>
    </div>
    
    
    
    </div>
    
    </div>
      )  }
    
    
    </div>
        </main>
        </>
      )
      
}

export default Content_Shorts