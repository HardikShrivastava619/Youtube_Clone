import React, { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate, useParams} from 'react-router-dom'
import './Urlform.css'

const Urlform = () => {

    const  [load , setLoad] = useState(false)
    const codeRef =useRef()

const navigate = useNavigate()
const params =    useParams()
console.log(params);


const handleNext = async (e) => {
    e.preventDefault();

    const code = codeRef.current.value
    console.log(code);
    
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
if (res.status === 202) {
    navigate(`/setPassword/${params.email}`)
}} catch (error) {
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
    <div  className='otpverific-google-container'   > <h1> <FcGoogle  onClick={handleLoading}/> </h1>  <h2  className='existing-email'> Enter Video's URL   </h2>
     </div>
    
    
    <div  className='otpverif-input-btn-container '   >
    <div className='otp-input-container-email ' >
    <label  className='OTP-email-input-heading'>Video URL </label>
    <input className=' form-control OTP-email-input' type="number" required  ref={codeRef}  />
</div>

<div className='Backlink-and-btn-container' >
<Link className='back-link'to="/Studio/Content" > Back </Link> 
<button  className='OTP-next-btn' > Next </button>
</div> 
</div>


         </div>
    
    </form>
    
    )}

export default Urlform;