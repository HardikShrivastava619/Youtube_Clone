import { RxCross2 } from 'react-icons/rx'
import './Shorts_upload.css'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import { RiInformationLine } from "react-icons/ri";
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'

const UploadVideoDetails = ({shortUrl,shortFile,setshortUrl,setshortFile}) => {
const [selectedDate, setSelectedDate] = useState();
const [showMore, setShowMore] = useState(false);
const [lastPart , setLastPart] = useState()
const logiData = useSelector(s=>s.loginData)



const reselectvideo=()=>{
try {
if (shortUrl) {
  setshortUrl("")
}
if (shortFile) {
  setshortFile("")
  
}

} catch (error) {
console.log(error)
}}



const languages = [
{ code: "🇸🇦", name: "Arabic" },
{ code: "🇧🇬", name: "Bulgarian" },
{ code: "🇨🇳", name: "Chinese" },
{ code: "🇭🇷", name: "Croatian" },
{ code: "🇨🇿", name: "Czech" },
{ code: "🇩🇰", name: "Danish" },
{ code: "🇳🇱", name: "Dutch" },
{ code: "🇪🇬", name: "Egyptian Arabic" },
{ code: "🇺🇸", name: "English" },
{ code: "🇵🇹", name: "European Portuguese" },
{ code: "🇫🇮", name: "Finnish" },
{ code: "🇫🇷", name: "French" },
{ code: "🇩🇪", name: "German" },
{ code: "🇬🇷", name: "Greek" },
{ code: "🇮🇱", name: "Hebrew" },
{ code: "🇮🇳", name: "Hindi" },
{ code: "🇭🇺", name: "Hungarian" },
{ code: "🇮🇩", name: "Indonesian" },
{ code: "🇮🇷", name: "Persian" },
{ code: "🇮🇹", name: "Italian" },
{ code: "🇯🇵", name: "Japanese" },
{ code: "🇰🇷", name: "Korean" },
{ code: "🇲🇾", name: "Malay" },
{ code: "🇲🇽", name: "Mexican Spanish" },
{ code: "🇳🇴", name: "Norwegian" },
{ code: "🇵🇱", name: "Polish" },
{ code: "🇧🇷", name: "Portuguese" },
{ code: "🇷🇴", name: "Romanian" },
{ code: "🇷🇺", name: "Russian" },
{ code: "🇷🇸", name: "Serbian" },
{ code: "🇸🇰", name: "Slovak" },
{ code: "🇪🇸", name: "Spanish" },
{ code: "🇸🇪", name: "Swedish" },
{ code: "🇹🇭", name: "Thai" },
{ code: "🇹🇷", name: "Turkish" },
{ code: "🇺🇦", name: "Ukrainian" },
{ code: "🇻🇳", name: "Vietnamese" },
{ code: "🇿🇦", name: "Zulu" },
];


const [thumbnail , setThumbnail] = useState('')
const [language , setLanguage] = useState('')
const [madeForKids , setmadeForKids] = useState('')
const [category , setcategory] = useState('')
const [commentsstatus , setCommentsstatus] = useState('')
const [allowViewRatings , setallowViewRatings] = useState('')


const titleRef = useRef()
const descriptionRef = useRef()

const tagRef = useRef()
const locationRef = useRef()





const urlIDgenerator =()=>{
try {
const url = shortUrl

setLastPart(url.split('/').pop())


} catch (error) {
console.log(error);

}
}


useEffect(()=>{
urlIDgenerator()
},[])




const handleNext= async (e) => {
try {

e.preventDefault()

const title = titleRef?.current?.value
const description = descriptionRef?.current?.value
const tag = tagRef?.current?.value
const location = locationRef?.current?.value
const videoData = new FormData()

videoData.append('title',title)
videoData.append('description',description)
videoData.append('tag',tag)
videoData.append('location',location)
videoData.append('thumbnail',thumbnail)
videoData.append('commentsstatus',commentsstatus)
videoData.append('allowViewRatings',allowViewRatings)
videoData.append('madeForKids',madeForKids)
videoData.append('language',language)
videoData.append('category',category)

videoData.append('selectedDate',selectedDate)
if (shortFile) {
videoData.append('shortFile',shortFile)  
}else(
videoData.append('shortUrl',shortUrl)
)
const res = await fetch (`http://localhost:1020/api/shorts/upload_shorts/${logiData?.user?._id}` , {
method:"POST",
body:videoData
})
const data = await res.json()
alert(data?.message)
console.log(data);

} catch (error) {
console.log(error);
}}

const toggleShowMore = () => {
setShowMore(!showMore);
};



return (
<form className="upload-vid-modal-container"  onSubmit={handleNext} >


<div  className='upload-vid-heading-container' >
    <p className='upload-vid-heading' >Upload shorts</p>
    <p className='upload-vid-heading'>  <RxCross2  onClick={reselectvideo}  className='upload-vid-RxCross'  />  </p>
    </div>
<div className='upload-video-main-container'>
<div   className='main-form-container' onSubmit={handleNext}>
<div>  
<h4  className='Detail-heading' > Details</h4>   
<input type="text" className='upload-vid-title-input form-control'  ref={titleRef}  placeholder='Title required'required style={ {  height:"9vh" ,width:"100%" , backgroundColor:"transparent",  borderRadius:".3rem",border: " 2px solid #888" }} />
</div>
<div  className='description-input-container' >
<textarea type="text" placeholder='Description required'  ref={descriptionRef} className=' form-control description-input '  />
</div>
<div className='thumbnail'  >
<div>  <h5>Thumbnail </h5>
<snap className="thumbnail-info">set a thumbnail that stands out and draws viewers attention.<Link  style={{textDecoration:"none" , fontSize:"small" }}>Learn more</Link> </snap>
</div>
<div className='thumbnail-options-container'   >
<label   className='upload-thumbnail'>   {thumbnail ? thumbnail.name : "Upload file"  }
<input  type='file'  required accept='images/*' name='thumbnail'onChange={(e)=>{ setThumbnail(e.target.files[0]) }} hidden /> 
</label>
</div>
</div>

<div className='Audience-info-container'  >
<h4  className='audience-heading'>Audience </h4>   
<h6>is this video "Made for Kids"?(required)</h6>
<p  className='childrens-privacy-info'>    Regardless of your location ,you're legally required to comply with Children's Online Privacy Protection Act (COPPA) and/or other laws. You're  required to tell us whether your videos are 'Made for Kids'.<Link to="https://support.google.com/youtube/answer/9528076?hl=en-GB" >What is made for Kid's content </Link>  </p> 
<div className=' personalised-ads'> 
<div>
<RiInformationLine  className='personalised-ads-RiInformationLine'  />
</div>
<p  className='personalised-ads-info' >Features like personalised ads and notifications won't be available on videos 'Made for Kids'. Videos that are set as 'Made for Kids' by you are more likely to be recommended alongside other children's videos. Learn more</p>
</div> 
</div>
<p className='restriction-questions'  >Do you want to restrict your video to an adult audience?
Age-restricted videos are not shown in certain areas of YouTube. These videos may have limited or no ads monetisation. <Link>Learn more</Link></p>

<select qwafev className='age-restriction-selector'  onChange={(e)=>{setmadeForKids(e.target.value)}} >
<option >   Age restriction (advanced)</option>
<option value="true"    >   Yes,it's 'Made for Kids'</option>
<option value="false"   >   NO,it's not 'Made for Kids'</option>
</select>

<button  className='btn btn-secondary upload-vid-show-more-btn ' type='button' style={{ marginTop:"4vh",  width:"8vw" ,borderRadius:"1.5rem"  , height:"2.5rem" }}  onClick={toggleShowMore}  > {showMore ? 'Show Less ' : 'Show More' }  </button>

{showMore ?  <>

<div className='tags-main-container' >

<h5> Tags </h5>
<p   className='tags-info'  >Tags can be useful if content in your video is commonly misspelt.Otherwise, tags play a minimal role in helping viewrs to find your video . <Link> Learn more </Link></p>
<div   className='tags-container' >
<input type="text"  className='form-control'   placeholder='Add tag' ref={tagRef}  />
<label className='tag-label' htmlFor="">  Enter a comma after each tag</label>
</div>
</div>


<div  className='lang-selector-main-container' >
<h5> video language </h5>
<label  className='select-lang-label'   htmlFor="">  Select your language </label>
<select className="form-select"   onChange={(e)=>{setLanguage(e.target.value)}} >
{languages.map((lang) => (
<option key={lang.code} value={lang.code} className='bg-secondary'  >
  <span style={{ marginRight: 10 }}>
    {lang.code} 
  </span>
  {lang.name}
</option>
))}
</select>
</div>

<div  className='recording-date-location-main-container'  >
<h5>Recording date and  location</h5>
<p className='recording-date-location-main-container-info'  >Add when and where your video was recorded.Viewers can search for videos by location </p>
<div className='recording-date-location-second-main-container'  >
<div className='recording-date-container'  >
<label  className='upload-vid-date-selecter-label'>Recorded date </label>

<DatePicker selected={selectedDate} dateFormat="yyyy/MM/dd" className="form-control  upload-vid-date-selecter"placeholderText="Select a date"   onChange={(date) => setSelectedDate(date)} />
</div>
<div  className='recording-location-container'>
<label   className='upload-vid-location-label' htmlFor="location">video location</label>
<input type="text"  placeholder='None'  className='form-control  upload-vid-location-selecter' ref={locationRef}  />
</div>
</div>
</div>
<div className='category-container'>
<h5>Category</h5>
<p className='category-info' > Add your video to a category so that viewers can find it more easily </p>
<select className='form-select category-selector' onChange={(e)=>{setcategory(e.target.value)}}  >  
<option value="Cars and vehicles">Cars and vehicles</option>  
<option value="Comedy">Comedy</option>  
<option value="Education">Education</option>  
<option value="Entertainment">Entertainment</option>  
<option value="Film and animation">Film and animation</option>  
<option value="Gaming"> Gaming</option>
<option value="How-to and style"> How-to and style
</option>
<option value="Music">Music</option>
<option value="News and politics">News and politics</option>
<option value="Non-profits and activism">Non-profits and activism  </option>
<option value="People and blogs">People and blogs</option>  
<option value="Pets and animals">Pets and animals</option>  
<option value="Science and technology">Science and technology</option>  
<option value="Sport">Sport</option>  
<option value="Travel and events">Travel and events</option>  
</select>
</div>


<div   className='comments-and-rating-container' >
<h5> Comments and ratings </h5>
<p className='comments-and-rating-info' >Choose if and how you want to show comments </p>
<div  className='comments-and-rating-container-main-div'>
<div className='upload-vid-comments-selector-main-container'>
<label  className='upload-vid-comment-selecter-label' >Comments</label>
<select className='upload-vid-comment-selecter' onChange={(e)=>{setCommentsstatus(e.target.value)}}>
<option>  select comments </option>
<option value="On">On</option>
<option value="Off">Off</option>
</select>
</div>
</div>

<input type="checkbox" className='upload-video-checkbox'  onClick={(e)=>{setallowViewRatings(e.target.checked)}} />  Show how many viewers like this video 
</div>



</> : null }




</div>

</div>
<div className='upload-vid-next-button-container'> 
<div  className='next-button-container-icons-container'  >  <snap> ¥ </snap> <snap>   € </snap> <snap>   🥱</snap> <snap className="checks-complete-info"> Checks complete . No issued found.  </snap>  </div> 
<button type='submit' className='btn btn-light uploaded-div-next-button'> Next </button>  </div>

    </form>
  )
}


export default UploadVideoDetails






