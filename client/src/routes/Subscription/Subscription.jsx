import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './subcription.css'

const Subscription = () => {

const loginData = useSelector(s=>s.loginData )
const [subscribedChannels ,setSubscribedChannels ] = useState([])



  
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



  function calculateDaysPassed(date) {
    const targetDate = new Date(date);
  
    const currentDate = new Date();
  
    const timeDifference = currentDate - targetDate;
  
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysPassed;
  }
  
  const days = calculateDaysPassed();
  
  


  return (
    <main  className='subscription-page' >
<h5 className='subscribed_page_latest_heading'   > Latest </h5>
<div  className='subscribed-videos-container' >

{subscribedChannels?.map((m)=> m?.uploadedVideos?.map(( v , i )=>    <Link key={i}  to="/youtube.com/video" className='subscribed-videos' > 
<img src={ v?.thumbnail.split('..\\client\\public').join('..\\..\\')} alt=""  className='video-Screen' />
<div   className='subscribed-video-channel-container'  >
<img src= {m?.profilePicture?.split('..\\client\\public').join('..\\..\\')}  alt="" className='video-channel-name' />
<p   className='mx-2' > {v?.title?.substring(0,80) }..  </p>

</div>
<div className='subscribed-video-views-container'   > 
<span  className='text-secondary'> {m?.channel} </span>
<span  className='text-secondary'> {v?.comments?.commentID?.numberOfviews.length }  views </span>
<span  className='text-secondary'> {calculateDaysPassed(v?.createdAt)} days ago  </span>
</div>
</Link>    )    
)}

</div>
    </main>
  )
}

export default Subscription