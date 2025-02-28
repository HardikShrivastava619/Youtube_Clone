import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './PlayLargevid.css'


 const PlayListlarggevid = () => {
  
const [video , setVideo] = useState()
const [playList , setPlayList] = useState()
const [views,setViews] = useState()
const [otherVideos,setOtherVideos] = useState([])
const loginData = useSelector(s=>s.loginData)
const params = useParams()  

const vidNum = playList?.videos?.findIndex((i)=> i === video?._id  )


const handleGetViews = async () => {
  try {
      
const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/comments/getVideoviwes/${video?._id}`)
const data = await  res.json()
setViews(data?.views?.numberOfviews.length)
  } catch (error) {
    console.log(error);
    
  }
}

const handleVideoViews = async ()=>{
  try {
const uid = loginData?.user?._id
const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/comments/setVideoviwes/${video?._id}`,{
method:"POST",
headers:{
'Content-Type':"application/json",

},
body:JSON.stringify({uid})
})
    const data = await res.json()


  } catch (error) {
    console.log(error);
    
  }
}



const fetchVid = async () => {
  try {
    const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/playList_large_vid/${params?.uid}/${params?.pid} `)
    const data = await res.json()
    
    setVideo(data?.video)
    setPlayList(data?.playList
)
  }catch (error) {
    console.log(error);
    
  }
}


const fetchOtherVideos = async () => {
  try {
const uid = loginData?.user?._id


    const res = await  fetch(`https://youtube-clone-v8xu.onrender.com/api/users/playList_other_videos/${uid}/${params?.pid}`)
const data = await res.json()

setOtherVideos(data?.user?.playlists[0]?.videos?.filter((v)=>v?._id !==  video?._id))
    
  } catch (error) {
    console.log(error);
    
  }
} 


useEffect(()=>{
handleGetViews()
handleVideoViews()
fetchOtherVideos()  

},[video?._id])


useEffect(()=>{
  fetchVid()
  
  
},[])

function calculateDaysPassed() {
  // Target date (June 7, 2024)
  const targetDate = new Date(video?.createdAt);

  // Current date
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const timeDifference = currentDate - targetDate;

  // Convert time difference to days (milliseconds to days)
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
}

const days = calculateDaysPassed();






return (
    <div className='large-video-page ' >   

    <div className='large-video-container text-light' >
    <iframe src={video?.video.split('..\\client\\').join('..\\..\\..\\..\\')} frameborder="0"  className='video-screen' ></iframe>
    <h5 style={{  height:"3%" }} >  {video?.title} </h5>
    <div className='large-videos-channel-btn-container' >
    <div className='  large-Download-video-channel-container'    > 
    
    <img src={`${video?.channelName?.profilePicture.split('..\\client\\public').join('..\\..\\..\\..\\') }`} className=' playlist-video-profile-image '   width="20%" height="55%" />
        <h6    className='mt-3' >{video?.channelName?.channel} </h6>
       </div>
    
    </div>
    
    <div   className='large-video-details-container'>  
  
  <div>  <div  className='views_and_Date_container'>      <p>  {views} views   </p>              <p> {days} days ago  </p>  </div>
    
    <Link> {video?.tags} </Link><br />
    
    ? Quos accusantium, vel, unde excepturi dolor praesentium voluptate recusandae nesciunt repellendus minus aspernatur!
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
  Adipisci nemo facere cupiditate facilis molestiae ipsam quis, porro perspiciatis debitis ab laudantium eaque, deserunt et provident beatae! Tempora blanditiis nulla corrupti hic ex quasi, minus similique ab suscipit voluptatem.
  Quaerat deserunt debitis illo corrupti adipisci. Inventore ab debitis doloribus minima, quis enim ipsa ea omnis consequuntur vero culpa ullam ratione nisi, cumque aliquid quibusdam harum distinctio suscipit repellendus repudiandae!
  Earum, odit laborum deserunt maiores aperiam tenetur saepe nostrum velit provident eius molestiae, praesentium nam voluptatem placeat maxime incidunt, laudantium dicta eos officia recusandae et veritatis. Deleniti fugiat vitae consectetur.
  Sit ipsum eos laudantium accusantium quasi, exercitationem maxime impedit amet similique recusandae, consequuntur odit dicta ratione! Deserunt asperiores voluptatibus autem quisquam aperiam praesentium totam, nam in similique, officiis eveniet quasi.
  Cumque at aut enim? Iste illum earum optio aliquam suscipit cumque temporibus, veritatis pariatur animi architecto, possimus error, sequi adipisci voluptates exercitationem distinctio repellendus necessitatibus! Quia aliquam cupiditate illo assumenda.
  Veniam quos porro ducimus modi fuga est tempore possimus soluta, placeat ab perspiciatis dolorum unde, sint natus repellat qui distinctio laboriosam? Inventore nesciunt adipisci pariatur voluptate esse accusantium fugit aliquid!
  Voluptatem autem enim excepturi, maxime quidem quaerat consectetur qui. Fugit blanditiis quod dolorem deserunt natus dolor. Architecto provident vitae culpa id aliquam quisquam ratione officia, pariatur voluptatum reiciendis deserunt sapiente?
  Non aut quisquam maiores dignissimos, quidem reiciendis deleniti blanditiis nulla ab unde, nam culpa officia iure asperiores dolorem quibusdam aliquid consectetur debitis at harum similique? Aspernatur blanditiis amet libero est.
  Cupiditate officia itaque cumque quisquam obcaecati fuga! Enim fugit voluptates culpa saepe quo. Labore quam ipsum corporis ipsa, molestiae sint obcaecati commodi libero distinctio! Numquam inventore earum ullam libero reprehenderit.
  Ipsum obcaecati ut optio nisi aliquam dolores eligendi vel rerum, culpa commodi cumque voluptas esse nostrum numquam. Numquam dicta autem adipisci provident modi? Sequi enim sint voluptas quisquam, recusandae aut?
  Accusamus, obcaecati. Delectus voluptatum amet illum quas sed nisi in facere aut magni, dolore animi consectetur ex laborum alias esse quia! Totam provident aperiam eligendi atque, sapiente autem excepturi consequuntur!
  Laborum ad cum ab, facilis quis nemo sit saepe dolor cumque aspernatur quisquam natus officia nobis eius tenetur magnam corrupti mollitia praesentium esse soluta. Ut blanditiis quod suscipit quia expedita.
  Excepturi culpa optio fuga praesentium earum id ab, deleniti ducimus quasi ratione blanditiis, molestias aperiam nihil dolore omnis vitae voluptatibus reprehenderit alias voluptas dolor. Voluptatem beatae tenetur quos unde reprehenderit!
  Consectetur, fugit consequatur blanditiis, molestias explicabo repellendus culpa hic earum possimus ipsum, natus eos nisi ducimus et obcaecati! Labore eos repudiandae nisi totam possimus corrupti cum quis fuga, iste cumque!
  Ratione reiciendis quaerat consectetur laborum. Et, eaque dicta. Vel commodi ratione maxime provident minus, officia quidem natus similique, porro libero voluptate mollitia perspiciatis magnam illo. Officiis tenetur id aliquid quibusdam?
  Animi consequuntur temporibus ad, adipisci quod optio suscipit aliquid quae accusamus cumque quis aperiam vel, velit expedita facilis est eligendi dicta tenetur repellendus voluptates molestias, atque provident. Libero, adipisci accusantium!
  Fugit, optio modi. Aspernatur, quod ab? Voluptas animi vero labore perferendis, odio consequuntur ratione pariatur quidem corrupti nostrum vel? Obcaecati iusto vel recusandae sunt porro quis mollitia modi dolorem rerum!
  Ea iure culpa atque porro in natus quis reprehenderit voluptatibus excepturi, architecto asperiores dicta quia ex sequi voluptas pariatur. Officiis quaerat nam necessitatibus accusantium dolore voluptates perferendis eum sint omnis. 
  </div>
   </div>

    </div>
    
    <div  className='playlist-video-playlist'  > 

      <div className='playlist-playlist-heading' ><div  className='playList_name' >   {playList?.name} <p className='playList_vid_number' >  {`${vidNum + 1}/${otherVideos?.length + 1 }`}  </p>   </div> <p className='mx-2' >X  </p>       
      </div> 
      <div  className='playlist-videos-in-playlist' >

{otherVideos?.map((v,i)=>    <Link key={i} to={`/video/${v._id}`}  className='playlist-vid-body'>   
     <img src={v?.thumbnail?.split("..\\client\\public").join("..\\..\\..\\..\\")}   className='playlist_vid_thumbnails'  alt="" />
  <div  className='playlist_vid_details'>
     <h6 className='playlist_vid_details_title'> {v?.title?.substring(0,67)  }...  </h6> 
   <p className='playlist_vid_details_channelName' > {v?.channelName?.channel} </p>
   </div>
     </Link>
   )}
     </div>
    
        </div>
    
       </div>
    

)
}

export default  PlayListlarggevid ;