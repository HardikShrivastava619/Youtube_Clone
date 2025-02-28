import React, { useEffect, useState } from 'react'
import {Link, Outlet} from 'react-router-dom'
import { IoFilterOutline } from "react-icons/io5";
import './studio.css'
import { useSelector } from 'react-redux';



const Studio = () => {



const [Channel ,setChannel ] = useState()
const loginData = useSelector(s=>s.loginData)



console.log(loginData);


  return (



    <main  className='channel-page' >

<h4  className='channel-heading'  > Channel Content </h4>


{loginData?.user?.channel === undefined ? <h5 className='channel_warning' >Please Make Your Channel first before  accesing this page   </h5>   :    
<>
<div  className='options-container'   >
   <Link className='options' > Inspiration </Link>
   <Link className='options'  to='/Studio/ContentVid'   >     Videos </Link>
   <Link className='options' to='/Studio/Content_Shorts'  > Shorts </Link>
   <Link className='options'> Live </Link>
   <Link className='options'> Posts </Link>
   <Link className='options'> Podcasts </Link>
   <Link className='options'> Promotions </Link>

      </div>
<div  className='filter-container' > 
<IoFilterOutline  className='filter-Line' />
    <span>Filter</span>
     </div>
 </>
}

<Outlet></Outlet>

    </main>
  )
}

export default Studio