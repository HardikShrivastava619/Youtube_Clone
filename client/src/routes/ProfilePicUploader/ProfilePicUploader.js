
import { useEffect, useRef, useState } from 'react'
import { loginSliceAction } from '../../Store/loginSlice.js'
import  { useDispatch, useSelector } from 'react-redux'

export const ProfilePicUploader = () => {

     const [profile , setProfile]  = useState()
     const [imgProfile , setImgProfile]  = useState()
     const [profilePicture,setProfilePicture] = useState()
     const [profilePhoto , setProfilePhoto] = useState()
     const logindata =  useSelector(s=>s.loginData)
     const dispatch = useDispatch()
     const nameRef = useRef()
     const emailRef = useRef()
     const descriptionRef = useRef()
     const dobRef = useRef() 
     const channelNameRef = useRef()
     
     
     
     
     const getphoto =  async () => {
       try {
     
         const email = logindata?.user?.email
     

         const res = await fetch (`https://youtube-clone-v8xu.onrender.com/api/users/getUserprofilePhoto/${email}`)
         const data= await res.json() 
        
         setProfilePhoto(data?.user?.profilePicture?.split('..\\client\\').join('..\\..\\..\\')   ) 
     
     
     
     
       } catch (error) {
         console.log(error);
         
       }
     }
     
     
     
     useEffect(()=>{
     
       getphoto()
     
     },[])
     
     
     
     
     
     const handleupload  = async(e)=>{
       try {
         e.preventDefault()
     
     
     const formData = new FormData()
     
     if (profilePicture) {
       formData.append('profilePicture',  profilePicture)
     }
     formData.append('DOB',dobRef?.current?.value)
     formData.append('Description',descriptionRef?.current?.value)
     formData.append('email',emailRef?.current?.value)
     formData.append('channel',channelNameRef?.current?.value)
     formData.append('name',nameRef?.current?.value)
     


         const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/updateprofile/${ logindata?.user?._id}/${logindata?.token}`,{
           method:"POST",
           headers:{
            'Authorization': `Bearer ${logindata?.token}`           
          },
          body:formData


         } )
     const data = await res.json()
     
     
     dispatch(loginSliceAction.loginReducer(data))
     alert(data?.message) 
     
     
     
     } catch (error) {
         console.log(error);
         
       }
     }
     
     
     
 


const handleProfile = ()=>{
      try {
        setProfile(true)
      } catch (error) {
        console.log(error);
        
      }
    }

    const handleImageUpload = (event) => {
        setProfilePicture(event.target.files[0])
        const file = event.target.files[0]; 
        if (file) { 
        const reader = new FileReader(); 
        reader.onload = (e) => { setImgProfile(e.target.result);  }; 
        reader.readAsDataURL(file); } 
      };
    
   const   handleHomeTab = ()=>{
      try {
        setProfile(false)
      } catch (error) {
        console.log(error);
        
      }
    }
    

    return {logindata,
        profile,
        handleHomeTab,
        handleProfile,
        imgProfile,
        handleImageUpload,profilePicture,nameRef,descriptionRef,emailRef,dobRef,handleupload,profilePhoto,channelNameRef
        
    }

}

