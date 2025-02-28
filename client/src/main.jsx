import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home/Home.jsx';
import VideoPage from './routes/Large_Video_Page/VideoPage.jsx';
import Download from './routes/Download/Download.jsx';
import Shorts from './routes/Shorts/Shorts.jsx';
import WatchHistory from './routes/HistoryPage/WatchHistory.jsx';
import Largedownloadvideo from './routes/Download/Largedownloadvideo.jsx';
import Watchlater from './routes/WatchLater/Watchlater.jsx';
import Profile from './routes/Profile/Profile.jsx';
import Subscription from './routes/Subscription/Subscription.jsx';
import Studio from './routes/Studio/Studio.jsx';
import Content from './routes/Studio/Content/Content.jsx';
import ChooseAccount from './routes/Loginforms/chooseaccount/ChooseAccount.jsx';
import Emailconfirmation from './routes/Loginforms/Emailconfirmation/Emailconfirmation.jsx';
import Dobform from './routes/Register/DobForm/Dobform.jsx';
import Signinform from './routes/Loginforms/Signinform/Signinform.jsx';
import Passwordform from './routes/Loginforms/Password/Passwordform.jsx';
import AnotherAcc from './routes/Register/loginbyAnotherAccount/AnotherAcc.jsx';
import Nameform from './routes/Register/Nameform/Nameform.jsx';
import Otpverification from './routes/Register/OTPverification/OTPverification.jsx';
import SetPassword from './routes/Register/SetPassword/SetPassword.jsx';
import {Provider} from 'react-redux'
import finalStore from './Store/index.js';
import Urlform from './routes/Studio/Content/URLform/Urlform.jsx';
import ProfilePicUPloader from './routes/ProfilePicUploader/ProfilePicUPloader.jsx';
import PlayList from './routes/PlayListFolder/playList/PlayList.jsx'
import PlayListlarggevid from './routes/PlayListFolder/PlayListLargeVid/PlayListlarggevid.jsx';
import ViewplayList from './routes/PlayListFolder/viewFullPlayList/ViewplayList.jsx';
import Contentvid from './routes/Studio/Content/ContentVideos/Contentvid.jsx';
import Content_Shorts from './routes/Studio/Content/Content_Shorts/Content_Shorts.jsx';
import ClickedShorts from './routes/clickedShort/ClickedShort.jsx';
import WatchlateplayAll from './routes/WatchLaterPlayAll/WatchlateplayAll.jsx';
import LikedVideos from './routes/LikedVideos/LikedVideos.jsx';
import Result from './routes/SearchedResult/Result.jsx';
import PageNotFound from './component/PageNotFound/PageNotFound.jsx';



const router = createBrowserRouter([
  {path:'/',  element:<App/> , children:[
  {path:"/" , element:<Home/>},
  {path:"/profile" , element:<Profile/>},
  {path:'/video/:vid' , element:<VideoPage/>},
  {path:'/downloads' , element:<Download/>},
  {path:'/shorts' , element:<Shorts/>},
  {path:'/shorts/:sid' , element:<ClickedShorts/>},
  {path:'/history' , element:<WatchHistory/>},
  {path:'/watchlater' , element:<Watchlater/>},
  {path:'/largedownloadvideo/:vid' , element:<Largedownloadvideo/>},
  {path:'/ProfilePicUPloader' ,element:<ProfilePicUPloader/>  },
  {path:'/subscription' , element:<Subscription/>},
  {path:'/WatchlaterplayAll/:vid' , element:<WatchlateplayAll/>},
  {path:'/Studio' , element:<Studio/>  ,children:[
  {path:'/Studio/Content' , element:<Content/>},
  {path:'/Studio/Contentvid' , element:<Contentvid/>},
  {path:'/Studio/Content_Shorts' , element:<Content_Shorts/>},
]},
  {path:'/PlayList/:uid' , element:<PlayList/>},
  {path:'/PlayList_largeVid/:uid/:pid' , element:<PlayListlarggevid/>},
  {path:'/view_PlayList/:pid' , element:<ViewplayList/>},
  {path:'/LikedVideos' , element:<LikedVideos/>},
  {path:'/result' , element:<Result/>},
]},


  {path:'/ChooseAccount/:email/:name' ,    element:<ChooseAccount/>  },
  {path:'/Emailconfirmation/:email' ,element:<Emailconfirmation/>  },
  {path:'/AnotherAcc/:name/:DOB/:gender' ,       element:<AnotherAcc/>  },
  {path:'/Dobform/:name', element:<Dobform/>},
  {path:'/Nameform' ,         element:<Nameform/>  },
  {path:'/Passwordform/:email' ,     element:<Passwordform/>  },
  {path:'/Otpverification/:email' , element:<Otpverification/>  },
  {path:'/setPassword/:email' ,   element:<SetPassword/>  },
  {path:'/Signinform' ,       element:<Signinform/>  },
  {path:'/*' ,element:<PageNotFound />  },

])

 createRoot(document.getElementById('root')).render(

    <Provider  store={finalStore}  >
<RouterProvider router={router} />
</Provider>

)
