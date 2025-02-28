import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link,  useNavigate} from 'react-router-dom';


export function WatchLaterJS() {
    const [ type , setType  ] = useState('All')
const loginData = useSelector(s=> s.loginData)
const [ watchLater ,  setWatchLater ] = useState([])
const [  hideRexcross,setHideRexcross]= useState(false)
const [ firstVideos ,  setFirstVideos ] = useState()

function calculateDaysPassed(date) {
  const targetDate = new Date(date);

  const currentDate = new Date();

  const timeDifference = currentDate - targetDate;

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
}

const days = calculateDaysPassed();




const handleWatchLater = async () => {
  try {
    const res = await fetch(`http://localhost:1020/api/users/get_WatchLater_vid/${loginData?.user?._id}  `)
    const data = await res.json()
    
    
setWatchLater(data?.getWatchLater?.WatchLater)
if (type==='All') {
  setFirstVideos(data?.getWatchLater?.WatchLater?.videos[0] )
  
}else if (type === 'videos') {
  setFirstVideos(data?.getWatchLater?.WatchLater?.videos[0] )
  
}else{
  setFirstVideos(data?.getWatchLater?.WatchLater?.shorts[0] )

}
  } catch (error) {
    console.log(error);
    
  }
}


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



const remove_vid_in_watchLater = async (vid) =>{
  try {
    const res = await fetch(`http://localhost:1020/api/users/send_vid_for_watchLater/${loginData?.user?._id}/${vid}`,{
      method:"PUT",
      headers:{
        "Content-Type":'application/json'
      }})
const data = await res.json()
 ;

await handleWatchLater()
} catch (error) {
    console.log(error);
    
  }


}



useEffect(()=>{
  handleWatchLater()

},[] )
useEffect(()=>{
  handleWatchLater()

},[type])



const navigate = useNavigate()




const bgi = firstVideos?.thumbnail.split('..\\client\\').join('..\\..\\').replaceAll( '\\' , '/' ) 

return {type,handleWatchLater,handlesaveshortWatchLater,remove_vid_in_watchLater,navigate,bgi , setType,loginData, watchLater , calculateDaysPassed, firstVideos ,  setFirstVideos ,setWatchLater,  hideRexcross,setHideRexcross } 
}