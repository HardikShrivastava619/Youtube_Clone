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
  {path:'/youtube.com',  element:<App/> , children:[
  {path:"/youtube.com" , element:<Home/>},
  {path:"/youtube.com/profile" , element:<Profile/>},
  {path:'/youtube.com/video/:vid' , element:<VideoPage/>},
  {path:'/youtube.com/downloads' , element:<Download/>},
  {path:'/youtube.com/shorts' , element:<Shorts/>},
  {path:'/youtube.com/shorts/:sid' , element:<ClickedShorts/>},
  {path:'/youtube.com/history' , element:<WatchHistory/>},
  {path:'/youtube.com/watchlater' , element:<Watchlater/>},
  {path:'/youtube.com/largedownloadvideo/:vid' , element:<Largedownloadvideo/>},
  {path:'/youtube.com/ProfilePicUPloader' ,element:<ProfilePicUPloader/>  },
  {path:'/youtube.com/subscription' , element:<Subscription/>},
  {path:'/youtube.com/WatchlaterplayAll/:vid' , element:<WatchlateplayAll/>},
  {path:'/youtube.com/Studio' , element:<Studio/>  ,children:[
  {path:'/youtube.com/Studio/Content' , element:<Content/>},
  {path:'/youtube.com/Studio/Contentvid' , element:<Contentvid/>},
  {path:'/youtube.com/Studio/Content_Shorts' , element:<Content_Shorts/>},
]},
  {path:'/youtube.com/PlayList/:uid' , element:<PlayList/>},
  {path:'/youtube.com/PlayList_largeVid/:uid/:pid' , element:<PlayListlarggevid/>},
  {path:'/youtube.com/view_PlayList/:pid' , element:<ViewplayList/>},
  {path:'/youtube.com/LikedVideos' , element:<LikedVideos/>},
  {path:'/youtube.com/result' , element:<Result/>},
]},


  {path:'/youtube.com/ChooseAccount/:email/:name' ,    element:<ChooseAccount/>  },
  {path:'/youtube.com/Emailconfirmation/:email' ,element:<Emailconfirmation/>  },
  {path:'/youtube.com/AnotherAcc/:name/:DOB/:gender' ,       element:<AnotherAcc/>  },
  {path:'/youtube.com/Dobform/:name', element:<Dobform/>},
  {path:'/youtube.com/Nameform' ,         element:<Nameform/>  },
  {path:'/youtube.com/Passwordform/:email' ,     element:<Passwordform/>  },
  {path:'/youtube.com/Otpverification/:email' , element:<Otpverification/>  },
  {path:'/youtube.com/setPassword/:email' ,   element:<SetPassword/>  },
  {path:'/youtube.com/Signinform' ,       element:<Signinform/>  },
  {path:'/youtube.com/*' ,element:<PageNotFound />  },

])

 createRoot(document.getElementById('root')).render(

    <Provider  store={finalStore}  >
<RouterProvider router={router} />
</Provider>

)
