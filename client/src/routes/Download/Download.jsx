import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import './download.css'


const Download = () => {



const loginData= useSelector(s=>s.loginData)

const [downloadVid , SetDownloadVid] = useState([])

const handleGetDownloadVideos = async () => {
  try {
    const res = await fetch(`http://localhost:1020/api/users/getDownloadedVid/${loginData?.user?._id}`)
const data = await res.json()

SetDownloadVid(data?.user?.Downloads)
} catch (error) {
    console.log(error);
    
  }
}


useEffect(()=>{
  handleGetDownloadVideos()
},[])
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

 const handleDeleteDownload = async (vid) => {
  try {



     const res = await fetch(`http://localhost:1020/api/users/deleteDownload_video/${loginData?.user?._id}/${vid}`,{
      method:"PUT",
      headers:{
        "Content-Type": 'apllication/json'
      }
    })
const data = await res.json()
handleGetDownloadVideos()
alert(data?.message)

  } catch (error) {
    console.log(error);
    
  }
}


  return (
    <main  className='main-download-page '  >

{  downloadVid?.length === 0  ?  <div className='no_download_img-container' > <img src="/youtube_img/oops.jpg"        className='no_download_img'    alt="" />      <h5  className='no_download_img_text' >   No Downloades   </h5>      </div>     :     downloadVid?.map((v,i)=> 
<Link  key={i} to={`/largedownloadvideo/${v?._id}` }className='downloaded-video'  >
<img src={v?.thumbnail?.split('..\\client\\public').join('..\\..\\..\\')  } className='downloaded-video-screen' />
<div className='downloaded-video-info'  >
<h6  className='downloaded-video-title' > {v?.title?.substring(0,30)} </h6>
<p className='downloaded-video-3dots dropdown ' data-bs-toggle="dropdown" aria-expanded="false"   >   ⁝   
<p  className='dropdown-menu downloadVid_delete_dropdown'     onClick={()=>{handleDeleteDownload(v?._id)}}  > <RiDeleteBin6Line  className='RiDeleteBin6Line-downloadVid_delete_dropdown' />Remove from Downloads </p>


</p>
</div>
<div className= 'downloaded-video-sanps'    >
<snap> {v?.channelName?.channel}  </snap>
<snap> {v?.comments?.commentID?.numberOfviews.length} views . {calculateDaysPassed(v?.createdAt) } days ago   </snap>
<snap className='downloaded-video-sanps-downloadoption'    > Downloaded   </snap>
</div>
</Link>
  )}
    </main>
  )
}

export default Download