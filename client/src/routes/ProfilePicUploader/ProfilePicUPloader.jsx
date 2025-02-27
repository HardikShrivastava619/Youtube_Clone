import './ProfilePicUploader.css'
import { ProfilePicUploader } from './ProfilePicUploader.js'
import { Link } from 'react-router-dom'


const ProfilePicUPloader = () => {
const { profile , handleImageUpload, handleHomeTab,logindata ,channelNameRef,profilePicture, handleProfile,imgProfile,nameRef,descriptionRef,emailRef,dobRef,handleupload,profilePhoto} = ProfilePicUploader()




  return (

<main  className='upload-dp-page' >


<div  className='upload-dp-page-header' >  <Link  className='upload-dp-page-header-Links'  onClick={handleProfile} > <h6> Profile </h6>  </Link> <Link    className='upload-dp-page-header-Links' onClick={handleHomeTab}  >   <h6> Home Tab </h6></Link>       </div>

{profile === false  ? <> 
 <div className='upload-dp-page-Home-Tab-page-header' >
<h6> Home tab </h6>
<p   className='upload-dp-page-Home-Tab-page-header-para' > Show your channel Home tab to showcase content for your audience. </p>
 </div>
 
 <div   className='upload-dp-page-Home-Tab-videos-container' >
  = <div  className='upload-dp-page-Home-Tab-videos-container-sub-div'  > <h6>Videos (2)</h6> <p className='upload-dp-page-Home-Tab-videos-container-sub-div-p'> This section will appear when a video has been uploaded  </p> </div>
 </div>
 <div   className='upload-dp-page-Home-Tab-videos-container' >
  = <div  className='upload-dp-page-Home-Tab-videos-container-sub-div'> <h6>Short Videos (2)</h6> <p className='upload-dp-page-Home-Tab-videos-container-sub-div-p'> This section will appear when a short videos has been uploaded  </p> </div>
 </div>
 <div   className='upload-dp-page-Home-Tab-videos-container' >
  = <div  className='upload-dp-page-Home-Tab-videos-container-sub-div'>  <h6>Created playLists (2)</h6>   <p className='upload-dp-page-Home-Tab-videos-container-sub-div-p'> This section will appear when there are archieved live streams  </p> </div>
 </div>
 <div   className='upload-dp-page-Home-Tab-videos-container' >
  = <div  className='upload-dp-page-Home-Tab-videos-container-sub-div'>  <h6>Past live streams (2)</h6> <p className='upload-dp-page-Home-Tab-videos-container-sub-div-p'> This section will appear when there's a public playlist </p> </div>
 </div>
</>
 : <form   className='upload-dp-form'  onSubmit={handleupload}      >
 <h5 className='upload-dp-form-firsth5' >  Your Profile </h5>
 <p  className='upload-dp-form-para1' > Your profile picture will appear where your channel is presented on YouTube, such as next to your videos and comments</p>
 
 <div  className='upload-dp-page-photo-upload-form' >
 
 <div   className='upload-dp-page-photo-upload-form-img-background' >   {  profilePhoto || imgProfile  ?  <img       src={       imgProfile ?  imgProfile  :  profilePhoto   } alt=""   style={{borderRadius:"50%", height:"100%"  ,width:"70%" ,cursor:"pointer"  }}  onClick={()=>{document.getElementById('fileInput').click()}}    /> 
  :  
 <label  className='upload-dp-page-photo-upload-form-label' onClick={()=>{document.getElementById('fileInput').click()}} > {logindata?.user?.name?.charAt(0)?.toUpperCase() } </label>
 }
 <input type='file' id='fileInput' hidden  onChange={handleImageUpload  }    />
 </div>
 <div  className='upload-dp-page-photo-upload-form-para'>
 <p>It's recommended that you use a picture that's at least 98 x 98 pixels and 4 MB or less. Use a PNG or GIF (no animations) file. Make sure that your picture follows the YouTube Community Guidelines. </p>
 <button   type='submit' className='upload-dp-page-photo-upload-form-button'    > Upload </button>  </div>
 </div>
 <div  className='upload-dp-page-Name-input-container' >
 <h6 className='upload-dp-page-Name-heading'>Name</h6>
 <label className='upload-dp-page-Name-input-container-label' > Choose your account name with which you want to get registered with youtube. Changes made to your name and picture are only visible on YouTube and not on other Google services. You can change your name twice in 14 days.  </label>
 <input type="text"  className='form-control'  ref={nameRef}  />
 </div>
 <div  className='upload-dp-page-Name-input-container' >
 <h6 className='upload-dp-page-Name-heading'  > Channel name</h6>
 <label className='upload-dp-page-Name-input-container-label' > Choose a channel name that represents you and your content. Changes made to your name and picture are only visible on YouTube and not on other Google services. You can change your name twice in 14 days.  </label>
 <input type="text"  className='form-control'  ref={channelNameRef}  />
 </div>
 <div  className='upload-dp-page-Description-input-container' >
 <h6 className='upload-dp-page-Name-heading'> Description </h6>
 <textarea   ref={descriptionRef}  className='form-control upload-dp-page-description-textarea' placeholder='Tell viewers your channel. Your description will appear in the About section of your channel and search results, among other places. '  ></textarea>
 </div>
 <div  className='upload-dp-page-email-input-container'  >
 <h6 className='upload-dp-page-Name-heading'  >Contact info </h6>
 <label className='upload-dp-page-Name-input-container-label' > Let people know how to contact you with business enquiries. The email address that you enter may appear in the About section of your channel and be visible to viewers.  </label>
 <input type="email" ref={emailRef}  className='form-control upload-dp-page-email-input-container-email '  placeholder='Email address' />
 </div>
 <div  className='upload-dp-page-Name-input-container' >
 <h6 className='upload-dp-page-Name-heading'  >Date of Birth</h6>
 <label className='upload-dp-page-Name-input-container-label' > Give your Date of Birth  that represents  your age. Changes made to your DOB and picture are only visible on YouTube and not on other Google services.  </label>
 <input type="date"  ref={dobRef}  className='form-control' />
 </div>
 </form>  }



</main>

)
}

export default ProfilePicUPloader

