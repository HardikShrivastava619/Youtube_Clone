import { matchPath, Outlet, useLocation } from "react-router-dom"
import Header from "./component/Header"
import Sidebar2 from "./component/Sidebar2"
import Sidebar from "./component/Sidebar"
import { useState } from "react"
import Studiosidebar from "./component/Studio/StudioSidebarcomponent/Studiosidebar"
import Studiosidebar2 from "./component/Studio/StudioSidebarcomponent/studiosideBar2"
import StudioHeader from "./component/Studio/StudioHeader/StudioHeader"
import { useSelector } from "react-redux"

function App() {
const [menu , setMenu] = useState(1)

 


const location = useLocation()

const removesidebar2Routes= [ "/youtube.com/video/:vid","/youtube.com/largedownloadvideo/:vid",'/youtube.com/WatchlaterplayAll',"/youtube.com/WatchlaterplayAll/:vid"  ,'/youtube.com/PlayList_largeVid/:vid/:pid',"/youtube.com/history","/youtube.com/Studio","/youtube.com/Studio/Content", '/youtube.com/Studio/Content_Shorts','/youtube.com/ProfilePicUPloader' ,'/youtube.com/Studio/ContentVid'  ]
const removesidebar2 = removesidebar2Routes.some((r)=> matchPath({path:r , exact:true} , location.pathname ) )

const removesidebarRoutes = ["/youtube.com/Studio","/youtube.com/Studio/Content", '/youtube.com/ProfilePicUPloader','/youtube.com/Studio/Content_Shorts' ,'/youtube.com/Studio/ContentVid'  ]
const  removesidear = removesidebarRoutes.some((r)=> matchPath ({path: r , exact:true}, location.pathname)) 

const removestudioSidebarRoute = ["/youtube.com/Studio" ,"/youtube.com/Studio/Content", ,'/youtube.com/Studio/ContentVid','/youtube.com/Studio/Content_Shorts' ]
const removestudioSidebar = removestudioSidebarRoute.some((r)=> matchPath ({path: r , exact:true}, location.pathname)) 


return <div  className=  "bg-black"    style={{  fontFamily:"Roboto", width:'100%', height:"100vh" ,position:"fixed", left:"0px" , right:"0px" }} >

 { removestudioSidebar ?   <StudioHeader setMenu={setMenu} menu={menu}  /> :  <Header setMenu={setMenu} menu={menu} />} 
 <div className="d-flex " > {  removesidear && removesidebar2  ? menu === 2  ?    <Studiosidebar2/>   :   <Studiosidebar/>    :              menu === 2  ?    !removesidebar2  &&  <Sidebar2/>   :   !removesidear && <Sidebar removesidebar2={removesidebar2} ></Sidebar>  }
 <Outlet   />
  </div>

</div>
 }

export default App
