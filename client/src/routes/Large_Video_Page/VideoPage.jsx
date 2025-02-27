import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { MdOutlineCancel, MdOutlineFeaturedPlayList, MdDownloading, MdDownloadDone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { RxDotsVertical, RxCross1 } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import './Videopage.css';
import { VideoPageJS } from './VideoPage.js';
import { SiYoutubeshorts } from "react-icons/si";



const VideoPage = () => {
    const { handleCommentsLikes, downloadedVid, downloadStarted, deleteDownloadModal, setDeleteDownloadModal,
        handleDeleteDownload, setShowMore, setplayListName, download, handleDownload,
        setDownload, setPrivacy, playlistOn, nameRef, video, handlePlaylist, handleAddToPlayList, subscribed,
        existingPlayList, handleComments, isChecked, handleCreatePlaylist, handleCheckboxChange,
        handleCommentsDisLikes, handleDeleteComment, handleSubscribe, otherVideos, loginData, CommentsRef, shorts,
        videoDetails, days, showMore, showModal, views, handleDisLikes, handleHorizontalDots,
        likeDone, handleLikes, likes, dislikeDone,othervidCalculateDaysPassed
    } = VideoPageJS();


console.log(shorts);




    return (
        <>
            {deleteDownloadModal && (
                <div className="delete_download_modal">
                    <div className="SiYoutubetv-div-container">
                        <FaYoutube className="download-modal-SiYoutubetv" />
                        <h5>YouTube</h5>
                    </div>
                    <h6 className="remove_downkoad_heading">Remove from Download</h6>
                    <div className="download_yes_no_options">
                        <button className="btn-cancelDownload" onClick={() => setDeleteDownloadModal(false)}>Cancel</button>
                        <button className="btn-delete-download-btn" onClick={() => handleDeleteDownload(video?._id)}>Delete</button>
                    </div>
                </div>
            )}
            {download && (
                <div className="download_modal">
                    <div className="SiYoutubetv-div-container">
                        <FaYoutube className="download-modal-SiYoutubetv" />
                        <h5>YouTube</h5>
                    </div>
                    <p>For high-quality unlimited downloads, ad-free and background play, get YouTube Premium.</p>
                    <h6>Wants to Download this Video</h6>
                    <div className="download_yes_no_options">
                        <button className="btn-cancelDownload" onClick={() => setDownload(false)}>Cancel</button>
                        <button className="btn-Download-download-btn" onClick={() => handleDownload(video?._id)}>Download</button>
                    </div>
                </div>
            )}

{showModal === true  ?  <div className='HiOutlineDotsHorizontal_modal' > 
<div className='HiOutlineDotsHorizontal_modal_firstDiv' > <p>Save Video to...</p>   <RxCross1  className='RxCross1_vidMod' onClick={handleHorizontalDots} />
</div>
<div   className='option_container' >
<div   className='HiOutlineDotsHorizontal_modal_SecondDiv'> 
<input type="checkbox" className='FaRegSquare'  checked={isChecked} onChange={handleCheckboxChange} />
<MdOutlineFeaturedPlayList className='MdOutlineFeaturedPlayList'  onClick={handleAddToPlayList}  />   
<FiPlus className='FiPlus' onClick={handlePlaylist} />  </div>


<div   className='HiOutlineDotsHorizontal_modal_playlist_div'   > <p>Watch Later</p> <select   className='select_PlayList' onClick={(e)=>{setplayListName(e.target.value)}}  >  <option> PlayLists </option>

{existingPlayList?.map((p ,i )=> <option value={p.name}  key={i}  >   {p.name}   </option> )}
  </select>  <p onClick={handlePlaylist}  > Create a playlist  </p> </div>
<div className='HiOutlineDotsHorizontal_modal_playlist_div'  onClick={handlePlaylist} >  <p >  <CiLock />   </p>  </div>
</div>
{playlistOn === true   ? <><input type="text"  ref={nameRef}  placeholder='Name'  className='playlistName' /> 
<select  className='playlistSelectPrivacy' onClick={(e)=>{setPrivacy(e.target.value)}} >   
<option   > Privacy </option>
<option  value='Public' > Public </option>
<option  value='Private' > Private </option>
</select>
<button  className='create_playList'  onClick={handleCreatePlaylist}  > Create </button>

</>   :    null   }

     </div>


: null  }

<div    className='large-video-page'>
      <div   className='large-video-container text-light'>
        <iframe src={video?.video?.replace('..\\client\\public', '..\\..\\')} className='video-screen'></iframe>
        <h5 className='largeVid_title text-white'>{video?.title || 'Untitled Video'}</h5>
        <div className='large-videos-channel-btn-container'>
          <div className='large-video-channel-container'>
            <img src={video?.channelName?.profilePicture?.replace('..\\client\\public', '..\\..\\')} className='large-video-profile-image' alt='Profile' />
            <div className='text-white large-video-channelName-container'>
              <h6 className='text-white large-video-channelName'>{video?.channelName?.channel || 'Unknown Channel'}</h6>
              <p className='text-white large-video-subscribersNum'>{video?.subscribers ? `${video.subscribers}k subscribers` : '0 subscribers'}</p>
            </div>
            <button className={subscribed ? 'btn btn-dark large-vid-subscribeBtn' : 'btn btn-light large-vid-subscribeBtn'} onClick={handleSubscribe}>
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
          <div className='large-video-Allbtn-container'>
            <button className={likeDone ? 'likeDone-btn' : 'like-btn'} onClick={handleLikes}><BiLike className='mb-1' style={{ fontSize: '1.5rem' }} /> {likes?.length}</button>
            <button className={dislikeDone ? 'unlikeDone-btn' : 'unlike-btn'} onClick={handleDisLikes}><BiDislike className='mb-1' style={{ fontSize: '1.5rem' }} /></button>
            <button className='share-btn mx-1'><PiShareFat /> Share </button>
            
           
{downloadedVid?.includes(video?._id) ? <button  onClick={()=>{setDeleteDownloadModal(true)}} className='download-btn mx-1' > <MdDownloadDone style={{ fontSize: '1.5rem' }}/> Downloaded </button>
:<button  onClick={()=>{setDownload(true)}} className='download-btn mx-1' > { downloadStarted ?   <MdDownloading style={{ fontSize: '1.5rem',color:'#0d6efd' }}  /> : <LiaDownloadSolid style={{ fontSize: '1.5rem' }}    />  }   Download </button>
}

            <button className='horizontal-dots' onClick={handleHorizontalDots}><HiOutlineDotsHorizontal className='HiOutlineDotsHorizontal' /></button>
          </div>
        </div>
        <div className='large-video-details-container'>
          <div className='views_and_Date_container'>
            <p>{views || 0} views</p>
            <p>{days || 0} days ago</p>
          </div>
          <Link>{video?.tags}</Link>
          <p className='videoPage_description_para'>{showMore ? video?.description?.substring(0, 20) : video?.description?.substring(0, 2)}</p>
          <p className='showMore_btn' onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less...' : 'Show more...'}</p>
        </div>
        <div className='large_vid_page_comments_container'>
          <h4 className='comments_heading_video_page'>{videoDetails?.commentText?.length} Comments</h4>
          <div className='comments_input_video_page_container'>
            <img src={video?.channelName?.profilePicture?.replace('..\\client\\public', '..\\..\\')} className='large-video-comments_profile-image' alt='' />
            <div className='comments_input_video_page_main_container'>
              <input type='text' ref={CommentsRef} className='large_video_comment_input' placeholder='Add a comment' required />
              <div className='largeVid_comment_btn_Container'>
                <button className='btn btn-outline-dark'>Cancel</button>
                <button className='btn btn-info' onClick={() => handleComments(video._id)}>Comment</button>
              </div>
            </div>
          </div>
          {videoDetails?.commentText?.map((v, index) => (
            <div key={index} className='user_comments_video_page_container'>
              <img src={v?.user?.profilePicture?.replace('..\\client\\public', '..\\..\\')} className='large-video-commented_user_profile-image' alt='' />
              <div className='user_comments_video_page'>
                <span className='commented_user_name'>{v?.user?.channel }</span>
                <p>{v?.text }</p>
                <div className='comments_like_disLike_btn'>
                  <BiSolidLike className={v?.commentLikes?.includes(loginData?.user?._id) ? 'text-info' : 'text-light'} onClick={() => handleCommentsLikes(v?._id)} />
                  <span className='coments_like_num'>{v?.commentLikes?.length || 0}</span>
                  <BiSolidDislike className={v?.commentDisLikes?.includes(loginData?.user?._id) ? 'text-danger' : 'text-light'} onClick={() => handleCommentsDisLikes(v?._id)} />
                </div>
              </div>
              <RxDotsVertical className='videosPage_RxDotsVertical dropdown' data-bs-toggle='dropdown' aria-expanded='false' />
              <ul className='dropdown-menu lagreVid_comment_delete_dropdown'>
                {v?.user?._id === loginData?.user?._id ? (
                  <li onClick={() => handleDeleteComment(v?._id)}>Delete Comment</li>
                ) : (
                  <li>Report Comment</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
 <div className=" videoPage_secondMaindiv"     >

<div  className=" videoPage_secondMaindiv_shorts_logoContainer" > <SiYoutubeshorts   className="vid_SiYoutubeshorts" /> <h6  className="shorts_head-vidpage" >Shorts  </h6>  </div> 

<div  className="videoPage_secondMaindiv-shorts_container" >
 
    {shorts?.map((s,i)=><Link key={i} className="videoPage_shorts"  > 
    
    <img  className="videoPage_shorts_thumbnail" src={s?.thumbnail?.split('..\\client\\public\\').join('\\')  }   alt="no_thumbnail" />
    <div  className="vid-page-shortsDetails-cont" > 
    <h6 className="vid-page-shortstitle" > {s?.title.substring(0,19)}... </h6>    
     <h5 className="vid-page-shortsviews" > 4 views </h5>   
    </div>
    

     </Link> )}
    
     </div>


<div className="othervid-container" >  

{otherVideos?.map((v,i )=> <Link  key={i} className="other-vid" >  <img src={v?.thumbnail?.split('..\\client\\public\\').join('\\')  }      alt="no-thumbnail" className="othervid-thumbnail"  />

<div className="other-vid-details-container" >
    <h6 className="othervid-title" > {v?.title?.substring(0,60)}...  </h6>
 <Link className="othervid-channelname " > {v?.channelName?.channel} </Link>   
<div  className="othervid-views" > <p> {v?.comments?.commentID?.numberOfviews?.length || 0 } views  </p> <p> {othervidCalculateDaysPassed(v?.createdAt)  } days   </p> </div>
     </div>

</Link>
  )}



</div>


 </div>
 
 
    </div>        </>
    );
};

export default VideoPage;

