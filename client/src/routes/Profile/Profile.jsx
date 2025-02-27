import React from 'react'
import { MdInsertComment } from "react-icons/md";
import './Profile.css'
import { profilejs } from './Profile';
import { Link } from 'react-router-dom';



 const Profile = () => {

const {navigate,loginData} = profilejs()







  return (
    <main className='profile-main-page' >

<div   className='profile-info-container'> 
<label htmlFor="" className='profile-img' >         {  loginData?.user?.profilePicture === undefined ?  <Link  className='your_Channel_profile_noImg'  onDoubleClick={()=>{ navigate('/youtube.com/ProfilePicUPloader')}} > {loginData?.user?.name?.charAt(0)} </Link>    :       <img    onDoubleClick={()=>{ navigate('/youtube.com/ProfilePicUPloader') }}   src={loginData?.user?.profilePicture?.split('..\\client\\public').join('..\\..\\')   }  className='your_Channel_profile'   />               }            <input type="file"  id='fileInput' hidden  />  </label>

<div  >
<h1  className='profile_name'  > {loginData?.user?.name.charAt(0).toUpperCase() + loginData?.user?.name?.slice(1)  } </h1>  
<p  className='profile_email' > {loginData?.user?.email } </p> 
  <p className='profile_email' >More about this channel</p>
  <div   className='d-flex' > 
    <button className='profile-info-container-btns' onClick={()=>{ navigate('/youtube.com/ProfilePicUPloader') }} > Customised channel </button>  
    <button className='profile-info-container-btns' > Manage videos </button>
  </div>
  </div>  </div>

     <div   className='profile-page-second-div  ' >
        <div  className=' visiblity-info-container '   >  
        <div className='visiblity-info-name_div'   >   
        <img  className='mini-profile-img' src={loginData?.user?.profilePicture?.split('..\\client\\public').join('..\\..\\')   } alt="" />     <p className='mt-2 mx-3 text-light '>{loginData?.user?.name.charAt(0).toUpperCase() + loginData?.user?.name?.slice(1)  }  </p>
</div> 
       <p   className='text-secondary  mx-4' > Visiblity: Public</p> </div>
      
<p className='text-secondary' > Post an update to your fans </p>      
      <div className='visiblity-info-name-second-div'   >
        <div className='visiblity-info-name-third-div'>
<p>  <MdInsertComment/> Image</p>
<p> <MdInsertComment/> Image poll</p>    
<p> <MdInsertComment/> Text poll </p> 
<p><MdInsertComment/> Quiz</p>
<p> <MdInsertComment/> Video</p> 
       </div>
        <div className='mx-2' >
        <button className='profile-page-second-div-btn1 ' >Post</button>
        <button className='profile-page-second-div-btn2' >i</button>
      </div>
        </div>
       </div>   
      
      
      
<div     className='profil_publishPost-div' >



<div  className='publish_scdule_div'  > 
<p className='published_heading'  >PUBLISHED</p>
<p className='published_heading' > SCHEDULED</p>
<p className='published_heading'> ARCHIEVED </p> </div>
<div className='pubLishePost_secondary_div'  >

<img  className='pencil-icon' src={loginData?.user?.profilePicture?.split('..\\client\\public').join('..\\..\\')   } alt="" />
<h6  > Publish Post </h6>
<p> Posts appear here after you publish and will be visible to your commnity  </p>
</div>

</div>
    </main>
  )
}

export default Profile


