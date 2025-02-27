import React, { useRef, useState } from 'react'
import "./Signinform.css"
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import {useSelector} from 'react-redux'


const Sifninform = () => {

const   [load , setLoad] = useState(false)

const emailRef =useRef()

const handleNext = async (e) => {
  try {
    const email = emailRef.current.value; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (email && emailRegex.test(email)){
      navigate(`/youtube.com/Passwordform/${email}`); 
    } 
    else { alert("Please enter a valid email address."); } 
  }catch (error) {
    console.log(error);
}}


const navigate = useNavigate()
const handleLoading = ()=>{
  try {

    
setLoad(true)
} catch (error) {
    console.log(error);
}}


  return (
<main className='ChooseAccount-main'   >
{ load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  :   <></>  }
    
<div  className= 'Signin-container'    > 
<div  className= 'signin-google-container'    > <h1> <FcGoogle  onClick={handleLoading}/> </h1>  <h2  className='existing-email' > Sign in </h2>
<p>to continue to YouTube </p>
</div>
    
    
    <div   className='signin-input-btn-container '      >
    <div   className='signin-input-container-email ' >
    <label className='signin-email-input-heading'  >Email address </label>
    <input className= ' form-control signin-email-input  '    type="email"   ref={emailRef}  />
</div>
<p  className ='confirm-alert text-white'  >    Not your computer? Use Guest mode to sign in privately. <Link to="https://support.google.com/chrome/answer/6130773?hl=en"  className=  'learnmore'   >  Learn more about using Guest mode </Link>  </p>
<div  className='newaccand-btn-container' >


<div className="dropdown">
  <Link   data-bs-toggle="dropdown" aria-expanded="false" className= 'newacc'    > Create account </Link>
  <ul className="dropdown-menu  new-acc-reason ">
    <li><Link className="dropdown-item  new-acc-reason-options"  to="/youtube.com/Nameform">For my personal Use</Link></li>
    <li><Link className="dropdown-item  new-acc-reason-options " to="/youtube.com/Nameform" >For my child </Link></li>
    <li><Link className="dropdown-item  new-acc-reason-options" to="/youtube.com/Nameform" > For my work or my business </Link></li>
  </ul>
</div>


<button  className='siginform-acc-next-btn'  onClick={handleNext}  > Next </button>
</div>  
</div>


         </div>
    
    </main>
)
}

export default Sifninform

