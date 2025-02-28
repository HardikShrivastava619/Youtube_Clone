import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link,  useNavigate} from 'react-router-dom';


export function LikedVideoJS() {
const loginData = useSelector(s=> s.loginData)
const [ LikedVideo ,  setLikedVideos ] = useState([])
const [  hideRexcross,setHideRexcross]= useState(false)
const [ firstVideos ,  setFirstVideos ] = useState()

function calculateDaysPassed(date) {
  const targetDate = new Date(date);

  const currentDate = new Date();

  const timeDifference = currentDate - targetDate;

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
}


const currMode = useSelector(s=>s.modeData)

const days = calculateDaysPassed();




const handleWatchLater = async () => {
  try {
    const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/get_likedVideos/${loginData?.user?._id}  `)
    const data = await res.json()
    
    
    
setLikedVideos(data?.userLikedVid?.likedVideos)
  setFirstVideos(data?.userLikedVid?.likedVideos[0] )
  
  } catch (error) {
    console.log(error);
    
  }
}


useEffect(()=>{
  handleWatchLater()

},[] )







const navigate = useNavigate()




const bgi = firstVideos?.thumbnail.split('..\\client\\').join('..\\..\\').replaceAll( '\\' , '/' ) 

return {handleWatchLater,navigate,bgi ,currMode, loginData, LikedVideo , calculateDaysPassed, firstVideos ,  setFirstVideos ,setLikedVideos,  hideRexcross,setHideRexcross } 
}