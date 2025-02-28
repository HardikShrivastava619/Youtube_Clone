import React, { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { loginSliceAction } from '../../../Store/loginSlice';
import "./Passwordform.css";
import { MdOutlineSecurity } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { RiKeyboardBoxFill } from 'react-icons/ri';

const Passwordform = () => {
    const dispatch = useDispatch();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()
    
    const handlenext = async () => {
        try {
            const password = passwordRef?.current?.value;
      
            const res = await fetch(`http://localhost:1020/api/users/login/${params?.email}`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ password }),
                credentials: "include",
            });
    
            const data = await res.json();

      
            handleLoading();
    
            setTimeout(() => {
                if (data?.success) {
                    dispatch(loginSliceAction.loginReducer(data));
                    navigate("/");
                alert('login Successfully')
                } else {console.log(data);
                
                    alert(data?.message);
                    setLoad(false);
                }
            }, 2000);
    
        } catch (error) {
            console.error("Error in handlenext:", error);
        }
    };
    

    const handleLoading = () => {
        setLoad(true);
    };



const reSet = async () => {
    try {
        
const password    = passwordRef1?.current?.value
const passSecond = passwordRef2?.current?.value


if (password !== passSecond) {
return    alert('Passwords do not match')
}

const res = await fetch(`http://localhost:1020/api/users/reset_password/${params?.email}` , {
    method:"PUT",
    headers:{
        'Content-Type':'application/json'
    },
body:JSON.stringify({password})
})
const data = await res.json()
console.log(data);

alert(data?.message)



    } catch (error) {
        console.log(error);
        
    }
}


    return (
        <main className='ChooseAccount-main'>

{showModal ? <div className="reset-password-modal-container"   >
                
                <div  className='set-password-Windows-Security' >
                <p>  <MdOutlineSecurity className='set-password-MdOutlineSecurity' /> Windows Security  </p>
                <p   >  <RxCross2  onClick={()=>{setShowModal(!showModal)}} />  </p>
                </div>
                
                <h4> Making sure it's you </h4>
                <p className='set-password-para-small' > Sign in with your Passkey to "google.com" as "{params.email}". </p>
                <p className='set-password-para-small2' > This request comes from the app "msedge.exe" by "Microsoft Corporation". </p>
                  <div className='set-password-input-container' >
                  <RiKeyboardBoxFill  className='set-password-RiKeyboardBoxFill ' /> 
                  <div  className='setPassword-pin-container' > 
                   
                    <input    ref={passwordRef1}  type="password" placeholder='password' className='set-password-password-input' />
                  
                   <input    ref={passwordRef2}  type="password"  placeholder='confirm your password'  className='set-password-password-confirm-input' />
                  </div>
                
                 </div>
                <div className=' set-password-ok-cancel-btn-container' > <button className='set-password-ok-btn btn btn-secondary' onClick={reSet}  > Set </button> 
                <button className='btn btn-dark set-password-cancel-btn '  onClick={()=>{setShowModal(!showModal)} } > Cancel </button> </div>
                  
                   </div>  : <></> }
                    


            {load && <span className="loading-bar col-8 bg-info"></span>}
            <div className='Signin-container'>
                <div className='Passwordform-google-container'>
                    <h1><FcGoogle onClick={handleLoading} /></h1>
                    <h2 className='existing-email'>Welcome</h2>
                    <Link to="/ChooseAccount" className='passworform-id-container'>
                        <Link className='passwodform-email-first-latter text-white' to="/ChooseAccount" onClick={handleLoading}> H </Link>  
                        {params?.email}
                    </Link>
                </div>



                <div className='Passwordform-input-btn-container'>
                    <div className='input-container-email'>
                        <label className='Passwordform-email-input-heading'>Enter your Password</label>
                        <input
                            className='form-control Passwordform-email-input'
                            type={showPassword ? "text" : "password"} // Toggle input type
                            ref={passwordRef}
                        />
                        <div className='text-white mt-2'>
                            <input 
                                type="checkbox" 
                                className="password-check-input form-check-input" 
                                id="exampleCheck1"
                                onChange={() => setShowPassword(!showPassword)} // Toggle state on change
                            /> Show password
                        </div>
                    </div>



                    <div className='forget-pass-and-btn-container'>
                        <Link onClick={()=> {setShowModal(!showModal)}} className='forget-password'>Forget Password?  </Link>
                        <button className='passwordform-next-btn' onClick={handlenext}>Next</button>
                    </div>  
                </div>
            </div>
        </main>
    );
};

export default Passwordform;
