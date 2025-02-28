import React, { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import './Nameform.css'
import { useSelector } from 'react-redux';



const Nameform = () => {


const [showModal, setShowModal] = useState(false);

const toggleModal = () => setShowModal(!showModal);


const navigate = useNavigate()
   
     const  [load , setLoad] = useState(false)
  
  
  const handleLoading = ()=>{
    try {
      
  setLoad(true)
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
const firstnameref  =   useRef()
const lastnameref  = useRef() 
  



const handlenext = (e)=>{
  try {
    e.preventDefault()
   const fullName = firstnameref.current.value.concat(" ",lastnameref.current.value)  
   handleLoading()
   setTimeout(()=>{
   navigate(`/Dobform/${fullName} `)
   },3000 )
 
  }catch (error) {
  console.log(error)
}
  

}


  
  
  
  return (
      <form onSubmit={handlenext} className= 'name-form-main'     >
  
  
  
  
      { load === true ?  <span  className="loading-bar col-8 bg-info"></span>  
       : <></>  }
      
      <div  className= 'nameformcontainer'       > 
      <div  className='nameform-entername-container  text-white'      onClick={handleLoading} > <h1> <FcGoogle/> </h1>  <h2  className='choose-an-account' > Create a google account </h2> 
      <p className='nameform_entername' > Enter your Name </p>
      </div>
      
      
  
      
      <div  className='nameform-inputs-container'   >
      
      <input type="name" placeholder='First name' required  ref={firstnameref}  className= 'name-input form-control '   />
      <input type="Lastname" placeholder='Last name (optional)' ref={lastnameref}  className='name-input form-control ' />

     
        
      
        </div>
        <button className='nameform-next-btn'  > Next </button>
           </div>
  
  
  
      </form>)}

//onClick={()=>{navigate("/Dobform")} }
export default Nameform