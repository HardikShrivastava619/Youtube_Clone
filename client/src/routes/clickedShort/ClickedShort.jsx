import React, { useEffect, useState } from 'react'
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { MdInsertComment } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { RxDotsVertical } from "react-icons/rx";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import './ClickedShort.css'


const ClickedShorts = () => {
  const loginData = useSelector(state => state.loginData);
  const [shorts, setShorts] = useState([]);
  const params = useParams()

  


  const getAllShorts = async () => {
    try {
      const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/shorts/get_all_shorts`);
      const data = await res.json();
  
      
      const clicked_Short   =  data?.shorts?.find(   (s) => s?._id.toString() === params?.sid  )
      const shortRemovedArr =  data?.shorts?.filter( (s) => s?._id.toString() !== params?.sid  )
      shortRemovedArr.unshift(clicked_Short) 
     
      setShorts(shortRemovedArr)
        
      } catch (error) {
      console.log(error);
    }
  }



  const handleLike = async (short) => {
    const updatedShorts = shorts.map(s => {
      if (s._id === short._id) {
        let updatedLikes = s?.comments?.commentID?.likes;
        let updatedDisLikes = s?.comments?.commentID?.disLikes;

        if (!updatedLikes?.includes(loginData.user._id)){
          updatedLikes?.push(loginData.user._id);
          updatedDisLikes = updatedDisLikes?.filter(id => id !== loginData.user._id);
        } else{
          updatedLikes = updatedLikes?.filter(id => id !== loginData.user._id);
        }

        return { ...s, comments: { ...s.comments, commentID: { ...s.comments.commentID, likes: updatedLikes, disLikes: updatedDisLikes } } };
      }
      return s;
    });

    setShorts(updatedShorts);
    await updateShortDetails(short._id, loginData.user._id, updatedShorts);
  }

  const handleDislike = async (short) => {
    const updatedShorts = shorts.map(s => {
      if (s._id === short._id) {
        let updatedLikes = s.comments?.commentID?.likes;
        let updatedDisLikes = s.comments?.commentID?.disLikes;

        if (!updatedDisLikes?.includes(loginData.user._id)){
          updatedDisLikes?.push(loginData.user._id);
          updatedLikes = updatedLikes?.filter(id => id !== loginData?.user?._id);
        } else {
          updatedDisLikes = updatedDisLikes?.filter(id => id !== loginData?.user?._id);
        }
        return { ...s, comments: { ...s.comments, commentID: { ...s.comments.commentID, likes: updatedLikes, disLikes: updatedDisLikes } } };
      }
      return s;
    });

    setShorts(updatedShorts);
    await updateShortDetails(short._id, loginData.user._id, updatedShorts);
  }

  const updateShortDetails = async (shortId, userId, updatedShorts) => {
    const short = updatedShorts.find(s => s._id === shortId);
    const { likes, disLikes } = short.comments.commentID;

    try {
const res =       await fetch(`https://youtube-clone-v8xu.onrender.com/api/comments/save_shorts_views/${shortId}/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ likes, disLikes })
      });

   const data = await res.json()
   console.log(data)


} catch (error) {
      console.log(error);
    }
  }


  const handleNotIntrested = (short)=>{
    try {
      setShorts(shorts.filter((v)=> v?._id !== short?._id  ) )


    } catch (error) {
      console.log(error);
      
    }
  }



  const handleSubscribe = async (short) => {
    try {
      const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/subscribed_channel/${loginData?.user?._id}/${short?.channelName?._id}` ,{
        method:"POST",
        headers:{
          'Content-Type' : 'application/json',
        }
      })
    const data = await res.json()

    
    getSubscribedarray()
    } catch (error) {
      console.log(error);
      
    }
  }


const saveShortHist = async () => {
  try {

const sid = params.sid

const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/setShortHistory/${loginData?.user?._id}`,  {
method:"POST",
headers:{
'content-Type' : 'application/json'
},
body:JSON.stringify({sid})
})
const data = await res.json()

} catch (error) {
    console.log(error);
}}



const updateViews = async () => {
  try {
    const sid = params?.sid



    const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/shorts/save_shorts_views/${loginData?.user?._id}/${sid} ` ,  {
      method:'PUT',
      header:{
        'Content-Type' : 'application/json'
      }, 
    } )
const data = await res.json()



  } catch (error) {
  console.log(error);
  
  }
}

const [subscribedArr , setSubscribedArr] = useState([])



const getSubscribedarray = async () => {
  try {
    const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/getUserSubscibedChannels/${loginData?.user?._id}`)
const data = await res.json()
setSubscribedArr(data?.usersSubscribedarray?.subscribedToChannels)
} catch (error) {
    console.log(error);
    
  }
}


  useEffect(() => {
    if (params.sid) {
      getSubscribedarray()
      getAllShorts();
      saveShortHist()
      updateViews()
    } else {
      console.error("sid parameter is undefined");
    }
  }, [params]);
  

  

  

  return (
    <div className= 'clicked_shorts-container-clicked'  >
      <div    className= 'clicked_shorts' >
        {shorts.length === 0 ? <h1 className= 'clicked_no_short_avail'   >   No Shorts are Available right now</h1> :
          shorts.map((short ) => (
            <div key={short._id}  style={{ display: "flex", flexDirection: "row", minHeight: "100%", margin: "1vh", width: "90%", alignItems: 'center' }}>
              <div className='clicked_shorts-info_container'>
                <div className='clicked_shorts-info_container_div'>
                  <img src={short?.channelName?.profilePicture.split('..\\client\\public').join('..\\..\\..\\')} alt="chnnl_not_loaded" className='clicked_shorts-channel-profile-img' />
                  <p className='clicked_shorts-info_container_para_second'>{short?.channelName?.channel}</p>
                  <button  className= { subscribedArr?.includes(short?.channelName?._id)  ?  'clicked_short_info_unsubscribe_btn'  :   'clicked_short_info_subscribe_btn'  } onClick={()=>{handleSubscribe(short)}}  >  {  subscribedArr?.includes(short?.channelName?._id)   ?    'Subscribed'  : 'Subscribe'  }    </button>
                </div>
                <p className='clicked_shorts-info_container_para'   >{short?.title?.substring(0, 50)}...</p>
              </div>
              <iframe src={short.video.split('..\\client\\').join('..\\..\\..\\')} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='clicked_shorts-iframe'></iframe>
              <div className='clicked_like-unlike-btn'>
                <div className='clicked_shorts-btn-container'>
                  <div className='clicked_btns'>
                    <button className=  { short?.comments?.commentID?.likes?.includes(loginData?.user?._id) ? 'clicked_shorts-btn_cliked' : 'clicked_shorts-btn' } onClick={() => handleLike(short)}><BiSolidLike /></button>
                    <p className='text-light'    >{short?.comments?.commentID?.likes?.length}</p>
                  </div>
                  <div className='clicked_btns'>
                    <button  className=  {  short?.comments?.commentID?.disLikes?.includes(loginData?.user?._id) ? 'shorts-btn_cliked' : 'shorts-btn' } onClick={() => handleDislike(short)}><BiSolidDislike /></button>
                    
                  </div>
                  <div className='clicked_btns'><button className=  'clicked_shorts-btn'  ><MdInsertComment className='text-light'  /></button><p className='text-light'>180</p></div>
                  <div className='clicked_btns'><button className= 'clicked_shorts-btn'   ><RiShareForwardFill className= 'text-light'  /></button><p className='text-light'  >Share</p></div>
                  <div className='clicked_btns dropend'><button className=   'clicked_shorts-btn-hz'   data-bs-toggle="dropdown" aria-expanded="false" ><RxDotsVertical    className=  'text-light text-tiny'   /> 
                  
                  <ul   className= "dropdown-menu     clicked_dropdown-menu-clickedShorts  "   >
  
  <p  className= 'clicked_not_intrested_shorts'       onClick={()=>{handleNotIntrested(short)}} >  Not Intrested </p>

  </ul>
                   </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
      </div>
    </div>
  )
}

export default ClickedShorts;
