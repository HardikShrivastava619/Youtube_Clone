import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import  './Setpassword.css'
import { MdOutlineSecurity } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { RiKeyboardBoxFill } from "react-icons/ri";
import {useSelector} from 'react-redux'

const SetPassword = () => {


const loginData =  useSelector(s=>s.loginData)
  const [showModal, setShowModal] = useState(false);
   const toggleModal = () => setShowModal(!showModal);
   const params = useParams()
   const  [load , setLoad] = useState(false)
  const passwordRef = useRef()
const passwordRef2 = useRef()

  const navigate = useNavigate()
   const handleLoading = ()=>{
  try {
    
setLoad(true)

  } catch (error) {
    console.log(error);
    
  }
}



const handleSet =async () => {
  try {

    if (passwordRef.current.value !== passwordRef2.current.value  ) {
      return  alert("password do not match with previous one")
    }

const password= passwordRef.current.value
if (!password) {
  return alert("please enter password")
}
const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/register_password/${params.email}`,{
  method:"POST",
  headers:{
    'Content-Type' : 'application/json'
  },
  body:JSON.stringify({password})
}) 
const data = await res.json()
alert(data?.message)

if (data?.success === true ) {
 navigate('/Signinform')
}else if (!data?.success) {
alert( data?.message )  
}

} catch (error) {
  console.log(error)
}} 


const getRandomHexColor =   ()=> {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}


useEffect(()=>{
  getRandomHexColor()

 const elm =   document.getElementsByClassName("setpassword-email-first-latter")[0]
 elm.style.backgroundColor  =  getRandomHexColor()
},[] )


const firstlatter = params.email[0].toUpperCase()







  return (
    <main className='ChooseAccount-main'  >




    { load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  
     : <></>  }
    
    <div  className='container'  > 
    <div  className='setpassword-container'   > <h1> <FcGoogle onClick={handleLoading} /> </h1>
    <h2  className='choose-an-account' > Set your Password </h2> 
    <Link   to="/ChooseAccount" className='setpassword-email-id-container'  > 
    <Link    to="/ChooseAccount" className='setpassword-email-first-latter'  onClick={handleLoading} > {firstlatter} </Link> {params.email} 
    </Link>
    
    
    </div>

    
    <div    className='set-password-img-container-btn'   >
    <img src="/images/additionalimages/passwordley.png" alt="passwordley.png"  className='set-password-img-container' />
<div  className='setpassword-btn-container' >
 <button className='set-password-btn' onClick={toggleModal}  >  Set Password </button>
</div>  </div>
         </div>
{showModal === true  ? <div className="set-password-modal-container"   >

<div  className='set-password-Windows-Security' >
<p>  <MdOutlineSecurity className='set-password-MdOutlineSecurity' /> Windows Security  </p>
<p   >  <RxCross2  onClick={toggleModal} />  </p>
</div>

<h4> Making sure it's you </h4>
<p className='set-password-para-small' > Sign in with your Passkey to "google.com" as "{params.email}". </p>
<p className='set-password-para-small2' > This request comes from the app "msedge.exe" by "Microsoft Corporation". </p>
  <div className='set-password-input-container' >
  <RiKeyboardBoxFill  className='set-password-RiKeyboardBoxFill ' /> 
  <div  className='setPassword-pin-container' > 
   
    <input    ref={passwordRef}  type="password" placeholder='password ' className='set-password-password-input' />
  
   <input    ref={passwordRef2}  type="password"  placeholder='confirm your password'  className='set-password-password-confirm-input' />
  </div>

 </div>
<div className=' set-password-ok-cancel-btn-container' > <button className='set-password-ok-btn btn btn-secondary' onClick={handleSet} > Set </button> 
<button className='btn btn-dark set-password-cancel-btn '  onClick={toggleModal}> Cancel </button> </div>
  
   </div>
 :  <></>}
    
    </main>)
}

export default SetPassword;