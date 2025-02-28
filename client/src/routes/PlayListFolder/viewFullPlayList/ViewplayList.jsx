import React, { useEffect, useState } from 'react';
import { LiaDownloadSolid } from 'react-icons/lia';
import { MdOutlinePlaylistPlay, MdSort } from "react-icons/md";
import { PiLineVerticalThin } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ViewplayList = () => {
  const params = useParams();
  const [user, setUser] = useState();
  const [playList, setPlayList] = useState();
const [removeunnav_heading , setRemoveunnav_heading]  = useState(false)

  const loginData = useSelector(s => s.loginData);

  const fetchOtherVideos = async () => {
    try {
      const uid = loginData?.user?._id;
      const res = await fetch(`http://localhost:1020/api/users/playList_other_videos/${uid}/${params?.pid}`);
      const data = await res.json();
      setPlayList(data?.user?.playlists[0]);
    } catch (error) {
      console.log(error);
    }
  };


  const getLoginUser = async () => {
    try {
      const userRes = await fetch(`http://localhost:1020/api/users/find_user/${loginData?.user?._id}`);
      const dataSecond = await userRes.json();
      setUser(dataSecond?.user);
    
    } catch (error) {
      console.log(error);
      
    }
  }


useEffect(()=>{
  getLoginUser()

},[loginData])

  useEffect(() => {
    fetchOtherVideos();
  }, []);

  const bgi = playList?.videos[0]?.thumbnail?.split("..\\client\\public").join('..\\..\\').replace(/\\/g, "/");
  console.log(playList);
   
  
  return (
    <main className='watchlater-main-page'>
      <div style={{ backgroundImage: `url(${bgi})` }} className='recent-watchlater-video'>
        <img src={bgi} alt="" className='recent-video' />
        <h2 className='watch-later-heading'>Watch Later</h2>
        <p className='watchlater-username mt-3'> {user?.name.charAt(0).toUpperCase() + user?.name?.slice(1) }  </p>
        <span style={{ fontSize: ".8em", position: "relative", zIndex: "2" }}> {playList?.videos.length}  videos  </span>
        <div className='btn-container mt-2'>
          <button className='download-watchlater-vid'><LiaDownloadSolid /></button>
          <button className='dots-watchlater-vid'>⁝</button>
        </div>
        <div className='d-flex payallshuuflebtn'>
          <button className='palyallbtn'>Play all</button>
          <button className='shufflebtn'>Shuffle</button>
        </div>
      </div>
      <div className='all-watchlater-videos'>
      { removeunnav_heading  ?    <></>   :    <div className='unavailablevid'>
          <p>Unavailable videos are hidden</p>
          <h4  onClick={()=>{setRemoveunnav_heading(true)}} style={{cursor:"pointer"}} ><RxCross1 /></h4>
        </div>
           }
        <div className='sort-container'>
          <h6><MdOutlinePlaylistPlay style={{ fontSize: "2rem", color: "grey" }} /> PlayList  </h6>
          <PiLineVerticalThin style={{ fontSize: "2rem", color: "grey" }} />
          <div className='sort-btn-containers'>
            <button className='btn btn-light'>All</button>
            <button className='sort-btns'>Videos</button>
            <button className='sort-btns'>Shorts</button>
          </div>
        </div>
        <div className='all-vid-container'>
          {playList?.videos?.map((v,i ) => (
            <Link className='all-vid' key={i} to={`/video/${v._id}`}  >
              <img src={v?.thumbnail?.split('..\\client\\public').join('..\\..\\')  } alt="not_uploaded" className='vid-screen' />
              <div style={{ width: "78%", height: "100%", paddingLeft: ".5vw" }}>
                <p className='text-white'  style={{height:"60%"  }} >  {v?.title} </p>
                <div className='vid-info-container'>
                  <div className='vid-info'>
                    <p> {v?.channelName?.channel} </p><LuDot />
                    <p>114k views</p><LuDot />
                    <p>11 days</p>
                  </div>
                  <h5 className='vertical-dots'>⁝</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ViewplayList;
