import React, { useEffect, useState } from 'react'
import './ChooseAccount.css'
import {Link, useParams} from 'react-router-dom'
import { PiUserCircle, PiUserRectangle } from 'react-icons/pi'
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import {useSelector} from 'react-redux'



const ChooseAccount = () => {


  const params = useParams()


  const   [load , setLoad] = useState(false)


const handleLoading = ()=>{
  try {
    
setLoad(true)

  } catch (error) {
    console.log(error);
    
  }
}



  return (
<main className=  'ChooseAccount-main'     >


{ load === true ?  <span  className="  loading-bar col-8 bg-info"></span>  
 : <></>  }

<div  className= 'container'    > 
<div  className= 'google-container'     > <h1> <FcGoogle onClick={handleLoading} /> </h1>  <h2  className='choose-an-account' > Choose an account </h2> </div>
<div    className='options-container-email ' >


<div className= 'previous-id-container'    >
<Link to="/youtube.com/Emailconfirmation"  className='email-first-latter'  onClick={handleLoading} > {params?.email.charAt(0).toUpperCase()  } </Link> 
<div className='name-email-container' >
<div className='profile-name-signed-0ut-container' >
<Link to="/youtube.com/Emailconfirmation" className= 'profile-name text-white '    onClick={handleLoading}   > {params?.name?.charAt(0).toUpperCase() + params.name.slice(1)}   </Link>  <Link className='sign-out'  > Signed out </Link>
 </div>
<Link className= 'profile-email' to="/youtube.com/Emailconfirmation" onClick={handleLoading}  > {params?.email} </Link>
</div>
</div>
<Link to="/youtube.com/Signinform" className= 'another-acc'   onClick={handleLoading} ><PiUserCircle  className= 'PiUserCircle'   /> Use another account   </Link>
<Link className= 'remove-acc '   onClick={handleLoading} ><MdOutlinePersonRemoveAlt1 className= 'MdOutlinePersonRemoveAlt1'   /> Remove an account </Link>
</div>
     </div>

</main>

)
}

export default ChooseAccount