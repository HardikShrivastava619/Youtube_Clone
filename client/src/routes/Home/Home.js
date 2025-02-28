import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const HomeJS = ()=>{




    const [videoDetails, setvideoDetails] = useState([]);
    const [shortsDetails, setshortsDetails] = useState([]);
    const [uid , setUid] = useState('')
    const [showAdv , setShowAdv] = useState(true)
    const [watchLaterShorts , setWatchLaterShorts] = useState([])
    const [advertisement, setadvertisement] = useState(0);
    const loginData =   useSelector(s=>s.loginData)    
    const [category , setCategory] = useState('All')
    
  
    const options = [ 'All' ,'Comedy' , 'Cars and vehicles' , 'Education' , 'Entertainment', 'Travel and events', 'Sport', 'Film and animation'  , 'Gaming' , 'Science and technology','How-to and style','Music','News and politics','Non-profits and activism','Pets and animals' , 'People and blogs' ]

  const handleNotIntrested = async (vid) => {
    try {
      const vidIndex = videoDetails.findIndex( v => v._id === vid )
       videoDetails.splice(vidIndex , 1 ) 
  setvideoDetails(videoDetails)
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  const getVideos = async () => {
    try {
  const res = await fetch(`http://localhost:1020/api/videos/getVideos/${category}`)
  const data = await res.json()
  setvideoDetails(data.videos)
  
  
  
  
  }catch (error) {
  console.log(error);
  }} 
  
  useEffect(()=>{
getVideos()
  },[category])
  
  
  const save_uploaded_Videos = async () => {
    try {
      const res = await fetch (`http://localhost:1020/api/users/updateuploaded_videos/${loginData?.user?._id}` , {
        method:'PUT',
  headers:{
    'Content-Type':'application/json'
  },
  })
        
      const data = await res.json()

      
      }catch (error) {
      console.log(error);
      }
      }        
    
  
  const getShorts = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/shorts/get_all_shorts`)
      const data = await res.json()
      setshortsDetails(data?.shorts)
  
   
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
    useEffect(()=>{
    getShorts()
    getVideos()
    save_uploaded_Videos()
    },[])
    
  
  
  const   [advertisementimg ,setAdvertisementimg]=  useState(["/Advertisement/1c7e77128954427.6160b3c820d33.jpg" ,"/Advertisement/D11.jpg" ,"/Advertisement/mynt.jpg" ,"/Advertisement/1c7e77128954427.6160b3c820d33.jpg"  ])
  const cancelAdvertisement = async () => {
    try {
      setShowAdv(false)
       
    } catch (error) {
      console.log(error)
  }
  }
  
  
    useEffect(()=>{
      if (advertisement < 3 ) {
     const hj =   setInterval(()=>{
          setadvertisement(advertisement+1)
          },3000)
        return ()=>{ clearInterval(hj) }   
        }else{
              setadvertisement(0)
            }
  
  
  },[advertisement])
  
  const handleNotIntrestedShorts = async (sid) => {
    try {
      const shortsIdx = shortsDetails.findIndex(s=> s._id === sid )
  
  shortsDetails.splice(shortsIdx , 1)
  
    } catch (error) {
      console.log(error);
      
    }
  }
  

  const handleWatchLater = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/get_WatchLater_vid/${loginData?.user?._id}  `)
      const data = await res.json()
  
  setWatchLaterShorts(data?.getWatchLater?.WatchLater?.shorts)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>{
    handleWatchLater()
  },[])
  
  
  
  const handlesaveshortWatchLater = async (sid) => {
    try {
  
      
  
      const res = await fetch(`http://localhost:1020/api/users/save_WatchLater_short/${loginData?.user?._id}/${sid}`,{
        method:"PUT",
        headers:{
          'Content-Type':"application/json"
        }
  
      })
      const data = await res.json()
      handleWatchLater()
      } catch (error) {
      console.log(error);
  }}
  














return {videoDetails,category,  setCategory,handlesaveshortWatchLater,watchLaterShorts,showAdv,getShorts,handleNotIntrestedShorts, advertisementimg,cancelAdvertisement ,setAdvertisementimg,setvideoDetails,shortsDetails,save_uploaded_Videos, setshortsDetails,advertisement, setadvertisement ,loginData  ,options  ,handleNotIntrested,getVideos}
}






















//