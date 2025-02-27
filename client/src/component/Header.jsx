import React, { useEffect, useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineAudio  } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { VscSignOut } from "react-icons/vsc";
import { SiYoutubestudio } from "react-icons/si";
import { SiSpringsecurity } from "react-icons/si";
import { RxMoon } from "react-icons/rx";
import { SlGlobe } from "react-icons/sl";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { loginSliceAction } from '../Store/loginSlice';
import { searchSliceAction } from '../Store/SearchSlice';


const Header = ({setMenu , menu}) => {
const [  user,setUser] = useState(' ')
  const   [load , setLoad] = useState(false)


const loginData = useSelector(s=>s.loginData)
const searchedData = useSelector(s=>s.searchedData)









const dispatch =   useDispatch()
const navigate = useNavigate()
const handleMenu = ()=>{
  try {
    if (menu === 1 ) {
      setMenu(2)
    }else if (menu === 2) {
      setMenu(1)
    }
  } catch (error) {
    console.log(error)
    
  }
}




const getUser = async () => {
  try {
    const res = await fetch(`http://localhost:1020/find_user/${loginData?.user?._id}`)
    const data = await res.json()

setUser(data?.user)
  } catch (error) {
    console.log(error);
    
  }
}


useEffect(()=>{
  getUser()
},[loginData])




const handlesignOut = async (params) => {
  try {
    
dispatch(loginSliceAction.logOutReducer())
navigate(`/youtube.com/ChooseAccount/${loginData?.user?.email}/${loginData?.user?.name}`)
  } catch (error) {
    console.log(error);
    
  }
}




const handleSearch = async (e) => {
  try {
    e.preventDefault()
    const res = await fetch(`http://localhost:1020/getSearchedVid/${searchedData?.keyWord}`)
    const data = await res.json()
    console.log(data);
    if (data?.succcess) {
      setLoad(true)
setTimeout(() => {
  dispatch(searchSliceAction.searchResult(data?.result))
  setLoad(false)
  navigate('/youtube.com/result')

}, 3000);

}


  } catch (error) {
    console.log(error);
    
  }
}


  return (
    <> 
    
 

     <header>

      <nav  className=  "navbar bg-black nav-Container"   >

  
      { load === true ?  <Link  className="loading-bar_head col-8 bg-danger"></Link>  
       : <></>  }
    <div className=  "container-fluid nav-second-container">
    <div  className='header-div1' >  
     <Link className="navbar-brand" to="#"> <MdOutlineMenu   className=  'menubar '    onClick={handleMenu} /></Link>
     <Link className=  "youTubeLogo "    aria-current="page" to="#"><BsYoutube className='  navbar-youtubelogo'/>YouTube</Link>
        </div>
          
        <form onSubmit={handleSearch} className=" search-bar-form " role="search" >
        
          <input className="search-bar bg-black "     type="search" placeholder={`Search`}  onChange={e=>dispatch(searchSliceAction.searchVid(e.target.value))}  aria-label="Search"/>
      <button   className=  'search-icon-div'   >
          <CiSearch   className='text-white CiSearch_header'/>
          </button  >
          <button   className='  audioSearch'     >    <AiOutlineAudio className= ' AiOutlineAudio  text-white '    /> </button>
        </form>
        <div  className= 'header-div3'    >
        <RiVideoAddLine />
        <IoMdNotificationsOutline />
       
        <div className="dropstart  "   >

         { loginData?.user ? user?.profilePicture  ?    <img   className='user_profile_img FaUserCircle  '   data-bs-toggle="dropdown" aria-expanded="false"  src={user?.profilePicture?.split('..\\client\\public').join('..\\..\\')  } alt="" />   :   <div className='  header-email-first-lettersecond '   data-bs-toggle="dropdown" aria-expanded="false" > {user?.name?.charAt(0)} </div>       : <FaUserCircle  className='FaUserCircle' data-bs-toggle="dropdown" aria-expanded="false" />} 


  <ul  className= "dropdown-menu header-dropdown-ul "     >
    <li  className='header-dropdown-li' >
    <div  className='header-profile-container' >
    { loginData?.user ?     user?.profilePicture  ?  <img   className='header-email-first-letter'     src={user?.profilePicture?.split('..\\client\\').join('..\\..\\')  } alt="" />
    : <div className='header-email-first-letter'  > {user?.name?.charAt(0)} </div>                   :  <FaUserCircle className =  'FaUserCircle_for_dropdown'   />  }    
    <div  className=   'header-profil-name-emailinfo'    >
    <span className= 'text-white'   > {user?.name?.charAt(0) + user?.name?.slice(1)  } </span>
    <span className= 'text-white'  > {user?.email} </span>
    <Link  className='view-channel-link'>view your channel </Link>
    </div>
        </div>
        </li>
        <hr />
        <li ><Link className="dropdown-item header-dropdown-link "    to=""><FcGoogle className='header-dropdown-icon' /> Google Account </Link></li>
        <li ><Link className= "dropdown-item header-dropdown-link "    onClick={handlesignOut} ><VscSignOut  className='header-dropdown-icon' /> {loginData?.user?.email ? 'Sign Out' : 'Login'}   </Link></li>
        <li ><Link className= "dropdown-item header-dropdown-link "   to="/youtube.com/Studio"><SiYoutubestudio className='header-dropdown-icon' /> Youtube studio </Link></li>
        <hr />
        <li ><Link className= "dropdown-item header-dropdown-link "   to=""><SiSpringsecurity className='header-dropdown-icon' /> Your data in YouTube</Link></li>
        
        <li ><Link className= "dropdown-item header-dropdown-link "   to=""><SlGlobe className='header-dropdown-icon' /> Location:"India" </Link></li>
        <li ><Link className="dropdown-item header-dropdown-link "   to=""><IoMdSettings className='header-dropdown-icon' /> Setting </Link></li>
</ul>
</div>
        </div>
     
    </div>
  </nav>
  </header>   

  
  
  </>
  )
}

export default Header

//: