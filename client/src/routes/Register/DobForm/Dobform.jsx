import React, { useRef, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import './Dobform.css'
import { useSelector } from 'react-redux';


  const Dobform = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const  [load , setLoad] = useState(false)
  const [month,setMonth]  =  useState()
  const  dateref =  useRef()
  const  yearref =  useRef()
  const  [gender,setGender] =  useState()

  
  const   handlestopLoading  = ()=>{
    try {
      
    setLoad(false)
  
    } catch (error) {
      console.log(error);
      
    }
    }

  const handleLoading = ()=>{
  try {
    
  setLoad(true)

  } catch (error) {
    console.log(error);
    
  }
  }



  
  const handleNext = (e) => {
    try {
      e.preventDefault();
      handleLoading();
  
      const selectedMonth = month;
      const day = dateref.current.value;
      const year = yearref.current.value;
  
      const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };
  
      if (!monthMap.hasOwnProperty(selectedMonth)){
      throw new Error("Invalid month selected.");
    }
  
      const parsedDate = new Date(Date.UTC(year, monthMap[selectedMonth], day));
  
      if (
        parsedDate.getUTCFullYear() !== parseInt(year, 10) ||
        parsedDate.getUTCMonth() !== monthMap[selectedMonth] ||
        parsedDate.getUTCDate() !== parseInt(day, 10)
      ) {
        handlestopLoading();
        alert("Invalid date. Please check your inputs.");

        throw new Error("Invalid date. Please check your inputs.");
      }
  
      const DOB = parsedDate.toISOString();
      

setTimeout(() => {
  navigate(`/AnotherAcc/${params.name}/${DOB}/${gender}`)
}, 3000)
} catch (error) {
  console.log(error);
}};
  



  return (
    <form  onSubmit={handleNext}  className='ChooseAccount-main'  >
    { load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  : <></>  }
    
    <div  className='container'    > 
    <div  className='google-passkey-container'   > <h1> <FcGoogle onClick={handleLoading} /> </h1>  <h2  className='choose-an-account' > Basic Information </h2> 
    <p className='mt-3' > Enter your birthday and gender </p>
    </div>
    
    

    
   <div   className='dobform-inputs-container'>
   <div   className='dobform-dob-input-container'>
  <select required className=' form-select months-selecter '   onChange={(e)=>{setMonth(e.target.value)}}  aria-label="Default select example">
  <option selected  className='form-select month-selecter-options' >Months</option>
  <option className='month-selecter-options' value="January">January</option>
  <option className='month-selecter-options' value="February">February </option>
  <option className='month-selecter-options'value="March">March</option>
  <option className='month-selecter-options'value="April">April</option>
  <option className='month-selecter-options' value="May">May</option>
  <option className='month-selecter-options'value="June">June</option>
  <option className='month-selecter-options'value="July">July</option>
  <option className='month-selecter-options' value="August">August</option>
  <option className='month-selecter-options' value="September">September</option>
  <option className='month-selecter-options' value="October">October</option>
  <option className='month-selecter-options' value="November">November</option>
  <option className='month-selecter-options' value="December">December</option>
</select>
    <input type="number"  required placeholder='Day' ref={dateref} className=' form-control dob-inputs' />
    <input type="number" required placeholder='Year' ref={yearref} className='dob-inputs form-control' />
    </div>
  <div  className='gender-nput-container ' >
  <select   required  className='form-select gender-input' aria-label="Default select example"   onChange={(e)=>  setGender(e.target.value)} >
  <option    value='' selected disabled  className='form-select month-selecter-options' >Gender</option>
  <option  className='month-selecter-options' value="Female">Female</option>
  <option  className='month-selecter-options' value="Male">Male </option>
  <option className='month-selecter-options'value="Rather not say">Rather not say</option>
  <option className='month-selecter-options'value="Custom">Custom</option>

</select>
    <Link  className='dobform-para' > Why we ask for birthday and gender </Link>
    <div></div>

    </div>
      
    
      </div>
      <button className='dobform-next-btn' > Next </button>
         </div>



    </form>)
  
}

export default Dobform