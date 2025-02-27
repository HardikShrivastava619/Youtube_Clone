import React, { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import {Link, useNavigate, useParams} from 'react-router-dom'
import './AnotherAcc.css'

const Emailform = () => {

    const  [load , setLoad] = useState(false)
const emailref = useRef()
const params = useParams()



const handleLoading = ()=>{
  try {
    
    setLoad(true)
    
      } catch (error) {
        console.log(error);
        
      }
    }
    const navigate = useNavigate()
    
    
    
    
    
    
    
    const handleNext = async (e) => {
      try {
        e.preventDefault()
        handleLoading()
        
const  name =params.name
const DOB = params.DOB
const gender = params.gender
const email  = emailref.current.value


const res = await fetch("http://localhost:1020/register" ,  {
method:"POST",
headers:{
  "Content-Type": "application/json"
},
body:JSON.stringify({name,DOB,email,gender  })
}) 

const data = await res.json()


if (data?.newUser?.isVerified  === false || data?.existingUser?.isVerified=== false ){
  setTimeout(() => {
  navigate(`/youtube.com/Otpverification/${email}`)
  }, 2000);
}else if (data?.existingUser?.isVerified  && !data?.existingUser?.password ) {
  setTimeout(()=>{
    navigate(`/youtube.com/setPassword/${email}`)
  }, 2000);
}else if (data?.existingUser?.isVerified  && data?.existingUser?.password){   
  navigate(`/youtube.com/Emailconfirmation/${email}`)
}



  } catch (error) {
    console.log(error);
    
  }
}





    
    return (
    <form  onSubmit={handleNext}   className='ChooseAccount-main'  >
    
    
    { load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  
     : <></>  }
    
    <div  className='Emailform-container' > 
    <div  className='Emailform-google-container'   > <h1> <FcGoogle  onClick={handleLoading}/> </h1>  <h2  className='existing-email' > Use your existing email </h2>
     <p>Enter the email address you want to use for your Google Account </p>
     </div>
    
    
    <div  className='Emailform-input-btn-container '   >
    <div className='input-container-email ' >
    <span  className='Emailform-email-input-heading' >Email address </span>
    <input  required className=' form-control Emailform-email-input' ref={emailref}  type="email" />
    <span  className='confirm-alert' >    you will need to confirm that this email belongs to you</span>
    </div>


<button  className='another-acc-next-btn' > Next </button>
  </div>


         </div>
    
    </form>
    
    )}

export default Emailform