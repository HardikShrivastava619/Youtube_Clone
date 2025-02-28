import React, { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate, useParams} from 'react-router-dom'
import './OTP.css'

const Otpverification = () => {

    const  [load , setLoad] = useState(false)
    const codeRef =useRef()

const navigate = useNavigate()
const params =    useParams()


const handleNext = async (e) => {
    e.preventDefault();

    const code = codeRef.current.value

    
    if (!code) {
        console.error("Code is required.");

        return;
    }

    try {
        const res = await fetch(`http://localhost:1020/api/users/verify/${params.email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });
        const data = await res.json();
         ;
        
if (data.success) {
    navigate(`/setPassword/${params.email}`)
    


}else if (!data?.success){
    alert('invali Code')
}

} catch (error) {
        console.error("Error during verification:", error);
    }
};

    const handleLoading = ()=>{
      try {
      setLoad(true)
      } catch (error) {
      console.log(error);
      }}
      
    
      return (
    <form className='ChooseAccount-main'  onSubmit={handleNext} >
    
    
    { load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  
     : <></>  }
    
    <div  className='otpverific-container' > 
    <div  className='otpverific-google-container'   > <h1> <FcGoogle  onClick={handleLoading}/> </h1>  <h2  className='existing-email' > Verify your email address </h2>
     </div>
    
    
    <div  className='otpverif-input-btn-container '   >
    <div className='otp-input-container-email ' >
<span  className='confirm-alert' >  Enter the code we sent to hardikShrivastava93@gmail.com.Check your spam folder if you don't see an email </span>
    <label  className='OTP-email-input-heading'>Enter Code </label>
    <input className=' form-control OTP-email-input' type="number" required  ref={codeRef}  />
</div>

<div className='Backlink-and-btn-container' >
<Link className='back-link' > Back </Link> 
<button  className='OTP-next-btn' > Next </button>
</div> 
</div>


         </div>
    
    </form>
    
    )}

export default Otpverification;