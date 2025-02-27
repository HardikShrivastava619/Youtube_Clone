import React from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LiaDownloadSolid } from "react-icons/lia";
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar2 = () => {
 

 


  return (
    <ul className=   "nav  sidebar-2-ul "  >
      
      <li className= 'sidebar-2-li '    >
        <Link to="/youtube.com" className=' nav-link text-white '>
        <IoMdHome  className='sidebar-2-icons' /></Link> 
        <p className='text-white' >Home</p>
      </li>
     
      <li  className= 'sidebar-2-li ' >
        <Link to="/youtube.com/shorts" className='nav-link text-white'    >
        <SiYoutubeshorts className='sidebar-2-icons' />  
        </Link>
        <p className='text-white'      >Shorts</p>
      </li>
      <li className='sidebar-2-li ' >
        <Link to="/youtube.com/subscription" className='nav-link text-white'    >
        <MdOutlineSubscriptions className='sidebar-2-icons'/> 
        </Link>
        <p className='text-white' >Subscriptions</p>
      </li>

      <li className= 'sidebar-2-li ' >
        <Link to="/youtube.com/profile" className='nav-link text-white'>
        <HiOutlineUserCircle className='sidebar-2-icons' />  
        </Link>
        <p className='text-white' >You</p>
      </li>
      <li className='sidebar-2-li '>
        <Link to="/youtube.com/downloads" className='nav-link text-white'    >
        <LiaDownloadSolid className='sidebar-2-icons'  />  
        </Link>
        <p className='text-white' >Download</p>
      </li>
     
      </ul>
 
  )
}

export default Sidebar2