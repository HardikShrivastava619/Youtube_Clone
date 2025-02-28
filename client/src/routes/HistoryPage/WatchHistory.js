import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { pauseHistSliceAction } from "../../Store/historySlice"

export function WatchHistoryJS() {

const [vidHist,setVidHist] = useState([])
const [shortHist,setShortHist] = useState([])
const [toggleclearHistory,settoggleclearHistory] = useState(false)
const [togglePauseHistory , settogglePauseHistory] = useState(false)
const [showShorts , setShowShorts] = useState(true)
const [showShortsModal , setShowShortsModal] = useState(false)

const navigate =  useNavigate()
const dispatch = useDispatch()
const loginData = useSelector(s=>s.loginData)



const handleDeleteHist = async () => {



    try {  
        const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/removeHistory/${loginData?.user?._id}`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
}})
 const data = await res.json()
  
 setVidHist([])
 settoggleclearHistory(false)
 navigate('/history')
 }catch(error) {
 console.log(error);
 }} 


 const gethistVid = async () => {
 try {
 const res   =  await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/getVideoHistory/${loginData?.user?._id}`)
 const data  =  await res.json()
 setVidHist(data?.user?.history?.videoHistory)
 
 
 } catch (error){
 console.log(error);
 }}


 const usersShortsHistory = async () => {
    try {
        const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/getShortHistory/${loginData?.user?._id}`)
const data = await res.json()


setShortHist(data?.user?.history?.shorts_history)

    } catch (error) {
        console.log(error);
        
    }
}  



useEffect(()=>{
gethistVid()
usersShortsHistory()
},[])


useEffect(()=>{
    gethistVid()
    usersShortsHistory()
} , [vidHist,shortHist])

const pauseData = useSelector(s=> s.PauseData)

const handlePause = ()=>{
    try {
        dispatch(pauseHistSliceAction.pauseHistDataReducer())
        settogglePauseHistory(false)
    } catch (error) {
        console.log(error);
        }}
const handleToggleClearHistory = ()=>{
    try {
        settoggleclearHistory(true)
settogglePauseHistory(false)
    } catch (error) {
        console.log(error);
        
    }
}

const handlePauseClearHistory = ()=>{
    try {
        settoggleclearHistory(false)
settogglePauseHistory(true)
    } catch (error) {
        console.log(error);
        
    }
}



const handleDleltevideo = async (v)=>{
    try {

        const vid = v?._id
        
        const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/setDletedVideoHist/${loginData?.user?._id}`, {
method:'PUT',
headers:{
'Content-Type' : 'application/json'
},
body:JSON.stringify({vid})


})

const data = await res.json()

        


    } catch (error) {
        console.log(error);
        
    }
}





const handleDlelteshort = async (s)=>{
    try {

        const sid = s?._id
        
        const res = await fetch(`https://youtube-clone-v8xu.onrender.com/api/users/setDletedShortHist/${loginData?.user?._id}`, {
method:'PUT',
headers:{
'Content-Type' : 'application/json'
},
body:JSON.stringify({sid})


})

const data = await res.json()

         ;
        


    } catch (error) {
        console.log(error);
        
    }
}






const handleHideShorts = async () => {
    try {
        
setShowShorts(!showShorts)

    } catch (error) {
        console.log(error);
        
    }
}



return {
    handleDleltevideo,handleDlelteshort,  navigate ,showShortsModal , loginData,setShowShortsModal,dispatch,showShorts,handleHideShorts, pauseData,toggleclearHistory,settogglePauseHistory, togglePauseHistory , settoggleclearHistory,vidHist,togglePauseHistory,toggleclearHistory,handleDeleteHist,handlePauseClearHistory,handleToggleClearHistory,handlePause,shortHist
}

}

