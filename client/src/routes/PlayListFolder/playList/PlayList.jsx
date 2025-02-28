import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './PlayList.css'
import { MdOutlinePlaylistPlay  } from "react-icons/md";
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiShareFat } from "react-icons/pi";


const PlayList = () => {
const [playList , setPlayList  ] = useState([])
const loginData = useSelector(s=>s.loginData)
const navigate = useNavigate()



const handleDelete = async (m) => {
  try {

    const uid = loginData?.user?._id
    
const res = await fetch(`http://localhost:1020/api/users/deletePlayList/${m?._id}`, {
  method:"POST",
  headers:{
    'Content-Type':"application/json"
  },
  body:JSON.stringify({uid})
} )
const data = await res.json()
 ;

if (data?.success) {
  setPlayList(playList.filter(playlist => playlist._id !== m._id));
}

}catch (error) {
console.log(error);
}}




  const handlegetPlayList = async () => {
    try {
      const res = await fetch(`http://localhost:1020/api/users/get_playList/${loginData?.user?._id}`)
      const data = await res.json()
      const parr = data?.playlist?.playlists.filter((v)=>  v?.videos?.length !== 0   )   

      setPlayList(parr)  
}catch (error) {
console.log(error);
}}
  



  useEffect(()=>{handlegetPlayList()

  },[])


return <>
<main  className='playlist_main'    >
<h1 className='playList_heading' >  PlayLists </h1>
{ playList?.length === 0    ? <img src="/youtube_img/noPlayList.png" alt="" className='img_noPlaylist'  /> : <>  <div className='playList_container'>  
{playList.map((m,i )=>   <div key={i}   className='playList_main_div text-white'        >
<p className='num_of_vid' > <MdOutlinePlaylistPlay />{m?.videos?.length} video </p>

    <img className='thumbnail_playlist' src={m?.videos[0]?.thumbnail.split('..\\client\\public').join('..\\..\\..\\..\\') } onClick={()=> {navigate( `/PlayList_largeVid/${loginData?.user?._id}/${m._id}`) } }   /> 

    <div className='playList_name_container'>
    <p> {m?.name?.substring(0,30)} </p> 
    <div class="dropdown">
  <button  className=  ' three_dots '    type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <BsThreeDotsVertical />
  </button>
  <ul className= " pldropdown-menu dropdown-menu  " >
    <li><Link className= "dropdown-item  pldropdown-item text-white"     href="#">   <PiShareFat    className='playList_modal_RiDeleteBin5Line' /><snap>Share </snap>    </Link></li>
    <li   ><Link className= "dropdown-item text-white"   href="#" onClick={()=>{handleDelete(m)}  } >   <RiDeleteBin5Line className='playList_modal_RiDeleteBin5Line' />   <snap>Remove  </snap>    </Link></li>
  </ul>
</div>
    </div>
    <div className='playList_para' > {m.privacy} </div>
    <Link className= 'view_full_playList' to={`/view_PlayList/${m?._id} `}  > View full playList </Link>
    </div>  )}           
</div></>  }

</main>


</>

}

export default PlayList;