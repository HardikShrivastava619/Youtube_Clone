import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const resultJS = () => {
    try {
        

const searchedData = useSelector(s=>s.searchedData)


const [resultedVId , setResultedVId ] = useState([])


useEffect(()=>{
setResultedVId(searchedData?.result)
},[searchedData?.result])


function calculateDaysPassed(date) {
    // Target date (June 7, 2024)
    const targetDate = new Date(date);
  
    // Current date
    const currentDate = new Date();
  
    // Calculate the difference in time (milliseconds)
    const timeDifference = currentDate - targetDate;
  
    // Convert time difference to days (milliseconds to days)
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysPassed;
  }
  
  


const handleNotIntrested = (sid)=>{
    try {
        
        const filteredArr =   resultedVId?.filter(v=> v?._id !== sid )
      return   setResultedVId(filteredArr)
 

    } catch (error) {
        console.log(error);
        
    }
}



return {resultedVId ,calculateDaysPassed , handleNotIntrested}

    } catch (error) {
        console.log(error);
        
    }
}