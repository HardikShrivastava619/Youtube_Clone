import React, { useEffect, useState } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import './download.css'


const Largedownloadvideo = () => {
  const [largeVideo , setLargeVideo ] = useState()
  const [ otherVideos , setOtherVideos ] = useState([])
const [showOtherVideos , setShowOtherVId] = useState(true)

    const video = {
        id: "3",
        title: " BECHara Roman",
        description: "JavaScript Basics aefvbn jknjkdbnvjkwenfkjvnekjfnewngfernjkvnerkvkdnvk cxk kfefk 2qnk a,c  1",
        thumbnail: "https://via.placeholder.com/480x270?text=Video+3+Thumbnail",
        videoUrl: "https://www.youtube.com/embed/igDbbiK7tTU?autoplay=1"
       ,likes:0,
        unlikes:0,
        channel : "wrestling chatter",
        profileImage:"../../public/images/diwalidisc.jpeg",
       subscribers: 40
       }
       const loginData = useSelector(s=>s.loginData)
       const params = useParams()
       
       const handleGetAllDonwloadedVideos = async () => {
        try {
          const res = await fetch(`http://localhost:1020/getDownloadedVidlarge/${loginData?.user?._id}/${params?.vid} `)
const data = await res.json()
const indx = data?.userInfo?.Downloads?.findIndex(v=> v?._id === params?.vid)
setLargeVideo(data?.userInfo?.Downloads[indx])
setOtherVideos(data?.userInfo?.Downloads.filter(v=>v?._id !== params?.vid ))

     
} catch (error) {
          console.log(error);
          
        }
      }
      
      useEffect(()=>{
        handleGetAllDonwloadedVideos()
      },[params])
    
        
    
    
  return (
    <div className='large-video-page' >   

    <div className='large-video-container text-light' >
    <iframe src={largeVideo?.video?.split('..\\client\\').join('..\\..\\..\\')} frameborder="0"  className='video-screen' ></iframe>
    <h5 className= 'text-white'  >  {largeVideo?.title} </h5>
    <div className= 'large-videos-channel-btn-container'    >
    <div   className='  large-Download-video-channel-container'    > 
    
    <img src={largeVideo?.channelName?.profilePicture?.split('..\\client\\public').join('..\\..\\..\\')  }    className=' download-video-profile-image '    />
        <h6    className='mt-3' >{largeVideo?.channelName?.channel} </h6>
       </div>
    
    </div>
    
    <div   className= 'download_large-video-details-container' >  
      
      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum nostrum quod neque ducimus reprehenderit maiores dolore magni? Quos accusantium, vel, unde excepturi dolor praesentium voluptate recusandae nesciunt repellendus minus aspernatur!
      Sit saepe possimus ipsam voluptatem rerum quis recusandae excepturi magni eos consequatur deserunt sed distinctio dicta ex, quam, quod sequi eaque atque dolorem. Consectetur velit ipsum assumenda nam fugiat sit?
      Ea modi vero hic provident sequi amet rerum maxime ducimus, velit, error aliquam, animi ad voluptates esse iusto nisi nobis maiores qui enim eum! Consectetur modi laborum reprehenderit officia expedita!
      Quo accusantium nobis quod maiores facere! Eius adipisci qui error vero repellendus, exercitationem sequi possimus, at animi numquam eum fuga! Assumenda dolores et placeat nam earum cumque odio itaque! Quas.
      Ipsam voluptates, veniam laudantium dignissimos id eveniet, nesciunt vero, dolorum adipisci unde accusamus cupiditate minus labore tempora. Ducimus iure voluptates saepe repellendus cumque non nesciunt maiores quo? Sapiente, ipsam reprehenderit?
      Suscipit cum minima facere amet nulla quasi sed sit, ratione dolorum soluta nesciunt eius consequuntur pariatur autem officiis. Soluta libero vitae beatae id harum nesciunt facere eveniet laborum doloribus placeat.
      Earum, reprehenderit iure. Ea veniam minima excepturi inventore fugiat, a architecto, provident quibusdam repellat eum in neque exercitationem. Aliquid iste, delectus ratione minus possimus numquam tempora praesentium placeat voluptas at?
      Similique pariatur, doloribus molestias aspernatur asperiores deleniti debitis repellat ipsam quisquam nisi nam, adipisci sint aliquid assumenda sed? Labore quasi sed repellendus animi nostrum nulla minima rem. Doloremque, animi architecto?
      Iure dolore atque voluptatibus quam explicabo quis architecto fugit nemo! Beatae repellat maxime dolor reprehenderit est dicta. Mollitia natus, fugit culpa aspernatur repellat unde, porro asperiores quod fuga laudantium aperiam.
      Reprehenderit quasi molestias error nisi quia quis magnam dignissimos delectus facere commodi? Consequuntur recusandae, veniam magni repellendus praesentium perferendis assumenda molestiae? Qui mollitia expedita voluptatem quaerat natus voluptatibus deserunt consectetur.
      Asperiores veritatis esse laborum nulla excepturi maxime quas placeat unde. Odit blanditiis, similique explicabo accusamus perferendis neque. Rem adipisci optio minima commodi, debitis, sequi, error ad neque incidunt corporis enim?
      Qui error consequuntur perferendis consectetur recusandae totam delectus aperiam, blanditiis veritatis cum odio obcaecati saepe fugiat cupiditate assumenda exercitationem nam nesciunt vero dolor? Soluta eaque, perspiciatis vero ut neque ipsa.
      Consequatur illum saepe provident praesentium corrupti veritatis quos, vitae molestiae voluptatem doloremque eaque suscipit natus, similique, eos commodi ut laudantium omnis culpa voluptas hic! Illo laborum est adipisci sequi ipsa?
      Explicabo, delectus! Dolorum minima exercitationem quaerat in voluptatum eaque dicta quia minus id sunt maxime iure, tenetur possimus reiciendis, quod beatae aspernatur ipsam aliquid nulla! Eum perferendis temporibus quidem rerum?
      Quaerat maxime laboriosam possimus asperiores itaque aspernatur consequatur non culpa accusamus. Odio enim eos eius debitis, rem expedita obcaecati praesentium quas consectetur, architecto possimus dignissimos reiciendis. Vel beatae qui tempore?
      Adipisci suscipit magni quia tempora doloremque officiis nostrum ullam odio maxime sunt? Rerum consequatur cupiditate tempore repudiandae sapiente exercitationem magnam maiores, quia assumenda optio pariatur dolorum totam excepturi neque aut.
      In distinctio reiciendis, impedit voluptatem, vitae non ab fuga, quisquam sunt dolorem ullam corporis. Quae culpa, veniam eligendi quis, totam voluptatum atque mollitia autem, dolore delectus maiores itaque recusandae laudantium?
      Adipure culpa atque porro in natus quis reprehenderit voluptatibus excepturi, architecto asperiores dicta quia ex sequi voluptas pariatur. Officiis quaerat nam necessitatibus accusantium dolore voluptates perferendis eum sint omnis. </p>
       </div>
    
    </div>
    
    <div  className='download-video-playlist'  > 

      <div  className= 'download-playlist-heading'    ><p>Download   </p> <p className='mx-2' > <RxCross1  onClick={()=>{setShowOtherVId(!showOtherVideos)}} />  </p>  </div> 
      
{showOtherVideos ?  <div   className='download-videos-in-playlist'  >
      {otherVideos?.map((v,i)=><Link  to={`/youtube.com/largedownloadvideo/${v?._id}`} key={i}  className='otherDownloadedVideos'  > 
    <img      className='downloaded_otherVideos_thumbnail'      src={v?.thumbnail.split('..\\client\\public').join('..\\..\\..\\')  } alt="" />
    <div className='downloaded_otherVideos_info_container'> <h6  className= 'downloaded_otherVideos_info_title'    > {v?.title} </h6> 
    <p  className='downloaded_otherVideos_info_channelName'   > {v?.channelName?.channel} </p>
    
      </div> 
    </Link>  )}
    </div>  :<></>  }     
    
        </div>
    
       </div>
    

)
}

export default Largedownloadvideo