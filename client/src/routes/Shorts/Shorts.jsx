import React, { useEffect, useState } from 'react'
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { MdInsertComment } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { RxDotsVertical } from "react-icons/rx";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import './shorts.css'


const Shorts = () => {
  const loginData = useSelector(state => state.loginData);
  const [shorts, setShorts] = useState([]);

  const getAllShorts = async () => {
    try {
      const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/shorts/get_all_shorts`);
      const data = await res.json();
      setShorts(data?.shorts);
    } catch (error) {
      console.log(error);
    }
  }



  const histShort =  async (sid) => {
    try {
  
      const vid = params?.vid
      const res = await fetch (`https://youtube-clone-v8xu.onrender.com/api/users/setShortHistory/${loginData?.user?._id}` , {
        method : 'POST',
        headers :{
          'Content-Type' :  'application/json'
        },
      body : JSON.stringify({vid})
      })
   const data = await res.json()   
    ;
   
   
     } catch (error) {
      console.log(error);
    }
  }
  

  const handleLike = async (short) => {
    
    
    const updatedShorts = shorts.map(s => {
      if (s._id === short._id) {
        let updatedLikes = s.comments?.commentID?.likes;
        let updatedDisLikes = s.comments?.commentID?.disLikes;

        if (!updatedLikes?.includes(loginData.user._id)) {
          updatedLikes?.push(loginData.user._id);
          updatedDisLikes = updatedDisLikes?.filter(id => id !== loginData.user._id);
        } else {
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
      await fetch(`https://youtube-clone-v8xu.onrender.com/api/comments/save_shorts_views/${shortId}/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ likes, disLikes })
      });
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
    getAllShorts()
    } catch (error) {
      console.log(error);
      
    }
  }



  useEffect(() => {
    getAllShorts();
  }, []);

  return (
    <div className='shorts-container' >
      <div className='shorts'  >
        {shorts.length === 0 ? <h1 className='no_short_avail'>No Shorts are Available right now</h1> :
          shorts.map((short) => (
            <div key={short._id} style={{ display: "flex", flexDirection: "row", minHeight: "100%", margin: "1vh", width: "90%", justifyContent:'center' ,alignItems: 'center' }}>
              <div className='shorts-info_container'  >
                <div className='shorts-info_container_div'>
                  <img src={short?.channelName?.profilePicture?.split('..\\client\\public').join('..\\..\\')} alt="chnnl_not_loaded" className='shorts-channel-profile-img' />
                  <p className='shorts-info_container_para_second'>{short?.channelName?.channel}</p>
                  <button  className= { short?.channelName?.subscribedToChannels?.includes(loginData?.user?._id)  ?  'short_info_unsubscribe_btn'  :   'short_info_subscribe_btn'} onClick={()=>{handleSubscribe(short)}}  >  { short?.channelName?.subscribedToChannels?.includes(loginData?.user?._id)  ?    'Subscribed'  : 'Subscribe'  }    </button>
                </div>
                <p className='shorts-info_container_para'>{short.title.substring(0, 50)}...</p>
              </div>
              <iframe src={short.video.split('..\\client\\').join('..\\..\\')} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='shorts-iframe'></iframe>
              <div   className='like-unlike-btn'>
                <div className='shorts-btn-container'>
                  <div className='btns'>
                    <button className={short?.comments?.commentID?.likes?.includes(loginData?.user?._id) ? 'shorts-btn_cliked' : 'shorts-btn'} onClick={() => handleLike(short)}><BiSolidLike /></button>
                    <p className='text-light'>{short?.comments?.commentID?.likes?.length}</p>
                  </div>
                  <div className='btns'>
                    <button className={short?.comments?.commentID?.disLikes?.includes(loginData?.user?._id) ? 'shorts-btn_cliked' : 'shorts-btn'} onClick={() => handleDislike(short)}><BiSolidDislike /></button>
                    <p className='text-light'>{short?.comments?.commentID?.disLikes?.length}</p>
                  </div>
                  <div className='btns'><button className='shorts-btn'><MdInsertComment className='text-light' /></button><p className='text-light'>180</p></div>
                  <div className='btns'><button className='shorts-btn'><RiShareForwardFill className='text-light' /></button><p className='text-light'>Share</p></div>
                  <div className='btns dropend'><button className='shorts-btn-hz' data-bs-toggle="dropdown" aria-expanded="false" ><RxDotsVertical className='text-light text-tiny' /> 
                  
                  <ul   className="dropdown-menu "    >
  
  <p  className='not_intrested_shorts'    onClick={()=>{handleNotIntrested(short)}} >  Not Intrested </p>

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

export default Shorts;
