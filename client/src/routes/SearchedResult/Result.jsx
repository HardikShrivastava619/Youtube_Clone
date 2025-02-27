import './Result.css'
import {Link} from 'react-router-dom'
import { MdDoNotDisturb } from "react-icons/md";
import { resultJS } from './Reult.js';


const Result = () => {


const {resultedVId,calculateDaysPassed,handleNotIntrested  } = resultJS()






  return (
    <main className='resulted_main' >
{resultedVId.length === 0 ?  <> <img src="/youtube_img/oops.jpg"   className='oops_img' alt="" />  <h5 className='oops-text' >  Oop's No Match Found </h5> </> :     resultedVId?.map((s,i)=><Link key={i}  to={`/youtube.com/video/${s._id}`} className='resulted-vid' > 
<img src={s?.thumbnail?.split('..\\client\\public').join('..//..//')  } alt=""  className="resultrd_vid_thumbnail" />    
    <div className='resultedVid_info' > <h5 className='rslt-vid-description' > {s?.description.substring(0,80) }</h5> 
    <div  className='text-secondary resultedVid_info-date ' >  <p>{s?.comments?.commentID?.numberOfviews.length} views  </p>  .   <p> {calculateDaysPassed(s?.createdAt)} days ago </p>             </div>
    <div  className='resulted-channelname text-secondary  ' >  <img src={s?.channelName?.profilePicture?.split('..\\client\\public').join('..//..//')  }   className='resulted_channelpic' alt="" />
    <p> {s?.channelName?.channel} </p>
     </div>
    </div>
    <Link    className=    "dropstart  resulted_threedots "   data-bs-toggle="dropdown" aria-expanded="false"   > ⁝ 
      <ul className="dropdown-menu result-drop-menu  " >  
    <li    className= 'vid-not-intrested-home'    onClick={()=>{handleNotIntrested(s?._id)}} > <MdDoNotDisturb className='MdDoNotDisturb-reultvid' /> not intrested  </li>

    
    
      </ul>
      
      
      </Link>
      
</Link>

   )  }
    </main>
  )
}

export default Result